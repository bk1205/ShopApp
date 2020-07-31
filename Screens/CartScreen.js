import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "react-native-elements";

import ProductItem from "../Components/ProductItem";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../store/actions/products";
import { addOrder } from "../store/actions/orders";

function CartPage(props) {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.products.cartProducts);
  let total = useSelector((state) => state.products.total);
  total = Math.ceil(total);
  const [count, setCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const addOrderHandler = async () => {
    try {
      setIsLoading(true);
      await dispatch(addOrder(cartProducts, total));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalTitle}>
          Total:{" "}
          <Text style={styles.price}>₹ {Math.round(total * 100) / 100}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Button
            disabled={cartProducts.length === 0}
            title="CheckOut"
            onPress={addOrderHandler}
          />
        )}
      </View>
      <Text style={styles.cartTitle}>{total > 0 && "CART ITEMS: "} </Text>
      <ScrollView>
        {cartProducts.map((product) => (
          <ProductItem
            key={product.id}
            title={product.title}
            price={product.price}
            img={product.imageUrl}
          >
            <View style={styles.qtyCounter}>
              <Icon
                name="plus"
                size={25}
                type="font-awesome"
                onPress={() => {
                  dispatch(increaseQuantity(product.id));
                  setCount(product.qty);
                }}
              />
              <View style={styles.numContainer}>
                <Text>{product.qty}</Text>
              </View>
              <Icon
                name="minus"
                size={25}
                type="font-awesome"
                onPress={() => {
                  dispatch(decreaseQuantity(product.id));
                  setCount(product.qty);
                }}
              />
            </View>
            <Icon
              name="trash"
              size={40}
              type="font-awesome"
              onPress={() => dispatch(removeItem(product.id))}
            />
          </ProductItem>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
    elevation: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  totalTitle: {
    fontSize: 20,
    fontFamily: "open-sans-bold",
  },
  price: {
    color: "#12CBC4",
  },
  cartTitle: {
    padding: 10,
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "#006266",
  },
  qtyCounter: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,
  },
  numContainer: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 20,
  },
});

export default CartPage;
