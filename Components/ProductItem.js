import React from "react";
import { View, StyleSheet, Image, Text, TouchableNativeFeedback } from "react-native";


function ProductItem(props) {
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
    <View style={styles.productCard}>
      <Image
        resizeMode="contain"
        source={{ uri: props.img }}
        style={styles.img}
      />
      <View style={{...styles.productDetails, ...props.styleDetails}}>
        <Text numberOfLines={4} style={styles.title}>
          {props.title}
        </Text>
        <Text style={styles.price}>₹ {props.price}</Text>
        <View style={styles.icons}>
          {props.children}
        </View>
      </View>
    </View>
    </TouchableNativeFeedback>
  );
}
export default ProductItem;

const styles = StyleSheet.create({
  productCard: {
    marginHorizontal: 5,
    marginVertical: 10,
    flexDirection: "row",
    height: 200,
    flex: 1,
    justifyContent: "space-around",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 10,
    padding: 10,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  img: {
    width: 150,
    height: "100%",
  },
  price: {
    fontSize: 22,
    color: "brown",
    textAlign: "left",
    marginTop: 15,
    fontFamily: "open-sans"

  },
  title: {
    fontSize: 15,
    fontFamily: "open-sans-bold"
  },
  icons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    alignItems: "flex-end",
  },
});
