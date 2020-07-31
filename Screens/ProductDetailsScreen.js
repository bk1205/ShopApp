import React from "react";
import { View, Text, Image, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { addToCart } from "../store/actions/products";

function ProductDetails(props) {
  const { productId } = props.route.params;
  const availableProducts = useSelector((state) => state.products.products);
  const selectedProduct = availableProducts.find(
    (product) => product.id === productId
  );
  const dispatch = useDispatch();
  props.navigation.setOptions({
    headerTitle: selectedProduct.title,
  })
  return (
    <ScrollView>
      {/* <Text style={styles.title}>{selectedProduct.title}</Text> */}
      <Image
        resizeMode="cover"
        source={{ uri: selectedProduct.imageUrl }}
        style={styles.img}
      />
      <Text style={styles.price}>₹ {selectedProduct.price}</Text>
      <View style={styles.btnContainer}>
          <Button title="ADD TO CART" onPress={() => dispatch(addToCart(selectedProduct.id))} />
          <Button title="Buy Now" />
      </View>
      <View style={styles.descContainer}>
        <Text style={styles.desc} >{selectedProduct.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // title: {
  //   marginTop: 10,
  //   fontSize: 20,
  //   textAlign: "center",
  // },
  img: {
    width: "100%",
    height: 400
  },
  price: {
    textAlign: "center",
    fontSize: 25,
    color: "#e43f5a",
    fontFamily: "open-sans"
  },
  btnContainer: {
      flex:1,
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: 15
  },
  descContainer: {
    padding: 20,
    borderColor: "#e19999"  ,
    borderWidth: 1,
    margin: 10,
    borderRadius: 10
  },
  desc: {
    fontSize: 18,
    fontFamily:"open-sans"
  },
});

export default ProductDetails;
