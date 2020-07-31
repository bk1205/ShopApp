import React, { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, AsyncStorage } from "react-native";
import { authenticate } from "../store/actions/auth";
import { useDispatch } from "react-redux";

function StartUpScreen(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem("userData");

            if(!userData) {
                props.navigation.navigate("Authentication")
                return;
            }
            const transformedData = JSON.parse(userData);
            const {token, userId, expiryDate} = transformedData;
            const expirationDate = new Date(expiryDate);
            if(expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate("Authentication")
                return;
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime

            dispatch(authenticate(userId, token, expirationTime));
        }
        tryLogin();
    }, [dispatch])

    return (
        <View style={styles.screen} >
            <ActivityIndicator size="large"/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default StartUpScreen;