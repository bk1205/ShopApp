import React from "react";
import { View, FlatList, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../Components/ProductItem";
import { deleteProduct } from "../store/actions/products";
import { Alert } from "react-native";

function MyProducts(props) {
  const userProducts = useSelector((state) => state.products.ownProducts);
  const dispatch = useDispatch();
  props.navigation.setOptions({
    headerRight: () => (
      <Icon
        name="ios-add-circle-outline"
        size={35}
        onPress={() => props.navigation.navigate("Edit Product", {productId: null})}
      />
    ),
  });

  function deleteProductHandler(id) {
    Alert.alert(
      "Are you sure!",
      "Do you really want to delete the product...",
      [
        { text: "No", style: "default" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            dispatch(deleteProduct(id));
          },
        },
      ]
    );
  }

  function editProductHandler(id) {
    props.navigation.navigate("Edit Product", { productId: id });
  }
  if(userProducts.length === 0) {
   return <View  style={{flex:1, justifyContent: "center", alignItems: "center"}}>
     <Text>No Products found, try adding some!</Text>
   </View>
  }
  return (
    <View>
      <FlatList
        data={userProducts}
        renderItem={(itemData) => (
          <ProductItem
            img={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
          >
            <AntDesign
              onPress={() => editProductHandler(itemData.item.id)}
              name="edit"
              size={35}
            />
            <AntDesign
              onPress={deleteProductHandler.bind(this, itemData.item.id)}
              name="delete"
              size={35}
            />
          </ProductItem>
        )}
      />
    </View>
  );
}

export default MyProducts;
