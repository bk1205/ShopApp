import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "../Components/OrderItem";
import { fetchOrders } from "../store/actions/orders";

function MyOrders() {
  const [isLoading, setIsLoading] = useState(false);
  const orderItems = useSelector((state) => state.orders.items);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if(orderItems.length === 0) {
    return <View  style={{flex:1, justifyContent: "center", alignItems: "center"}}>
      <Text>No Orders found, start ordering some products!</Text>
    </View>
   }
  return (
    <View>
      <FlatList
        data={orderItems}
        renderItem={(itemData) => (
          <OrderItem
            amount={itemData.item.totalamount}
            date={itemData.item.readableDate}
            items={itemData.item.items}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyOrders;
