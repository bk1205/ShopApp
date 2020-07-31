import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ItemCard(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.qty}>{props.qty}</Text>
            <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
            </View>
            
            <Text>₹ {props.price}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#fff",
        margin: 10
    },
    qty: {
        color: "#dd7631",
        fontFamily: "open-sans",
    },
    titleContainer: {
        width: "70%",
        marginHorizontal: 10,
        fontFamily: "open-sans"
    }
})

export default ItemCard;