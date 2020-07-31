import React, { useState } from "react";
import { Text, Button, View, StyleSheet } from "react-native";
import ProductItem from "./ProductItem";
import ItemCard from "./ShortItemCard";

function OrderItem(props) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>₹ {props.amount}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        title="Show Details"
        onPress={() => setShowDetails(prevState => !prevState)}
      />
      {showDetails && <View>
          {props.items.map((item,index) => (
              <ItemCard key={index} qty={item.qty} title={item.title} price={item.price} />
          ))}
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 10,
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
  },
});

export default OrderItem;
