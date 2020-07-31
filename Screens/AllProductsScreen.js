import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  View,
  Button,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";

import ProductItem from "../Components/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, fetchProducts } from "../store/actions/products";

function ShopHome({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  navigation.setOptions({
    headerRight: () => (
      <Icon
        name="ios-cart"
        size={23}
        onPress={() => navigation.navigate("Cart")}
      />
    ),
    headerLeft: () => (
      <Icon
        name="ios-menu"
        size={23}
        onPress={() => navigation.toggleDrawer()}
      />
    ),
  });

  const availableProducts = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setIsRefreshing(true);
    try {
      dispatch(fetchProducts()), [dispatch];
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false);
  }, [setIsLoading, setError, dispatch]);

  useEffect(() => {
    const willFocusSub = navigation.addListener("focus", loadProducts);
    return () => {
      willFocusSub();
    };
  });

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => setIsLoading(false));
  }, [dispatch, loadProducts]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured! </Text>
        <Button title="Try Again" onPress={loadProducts} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (!isLoading && availableProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Products available! Try adding some...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={loadProducts} />
      }
      style={styles.screen}>
      {availableProducts.map((product) => (
        <ProductItem
          key={product.id}
          title={product.title}
          price={product.price}
          img={product.imageUrl}
          stylePrice={styles.price}
          onPress={() =>
            navigation.navigate("Details", { productId: product.id })
          }
        >
          <AntDesign
            onPress={() =>
              navigation.navigate("Details", { productId: product.id })
            }
            name="profile"
            size={35}
          />
          <AntDesign
            onPress={() => dispatch(addToCart(product.id))}
            name="shoppingcart"
            size={35}
          />
        </ProductItem>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ShopHome;
