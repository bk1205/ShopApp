import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, SafeAreaView, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import { Entypo, Ionicons } from "@expo/vector-icons";

import StartUpScreen from "../Screens/StartUpScreen";
import AllProductsScreen from "../Screens/AllProductsScreen";
import ProductDetailsScreen from "../Screens/ProductDetailsScreen";
import CartScreen from "../Screens/CartScreen";
import OrdersScreen from "../Screens/OrdersScreen";
import OwnProductScreen from "../Screens/OwnProductScreen";
import EditProductScreen from "../Screens/EditProductScreen";
import AuthScreen from "../Screens/AuthScreen";
import { logOut } from "../store/actions/auth";

const ProductStack = createStackNavigator();

function ProductsNavigator({ navigation }) {

  const isLoggedIn = useSelector((state) => !!state.auth.token);  
  return (
    <ProductStack.Navigator
      screenOptions={{
        headerTitleStyle: { fontFamily: "open-sans-bold", color: "#00909e" },
      }}
    >
      {isLoggedIn ? (
        <>
          <ProductStack.Screen
            name="Home"
            component={AllProductsScreen}
            options={{
              headerRightContainerStyle: { padding: 20 },
              headerLeftContainerStyle: { padding: 15 },
            }}
          />
          <ProductStack.Screen
            name="Details"
            component={ProductDetailsScreen}
            options={{
              headerTitleContainerStyle: { width: "70%" },
            }}
          />
          <ProductStack.Screen name="Cart" component={CartScreen} />
        </>
      ) : (
        <>
          <ProductStack.Screen name="Startup" component={StartUpScreen} />
          <ProductStack.Screen
            name="Authentication"
            component={AuthScreen}
            options={{
              headerLeft: null,
              headerTitleContainerStyle: { marginHorizontal: 100 },
              headerTitleStyle: { color: "#1b1b2f" },
              headerTransparent: "true",
            }}
          />
        </>
      )}
    </ProductStack.Navigator>
  );
}

const OrdersStack = createStackNavigator();

function OrdersNavigator({ navigation }) {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen
        name="Your Orders"
        component={OrdersScreen}
        options={{
          headerLeft: () => (
            <Icon
              name="ios-menu"
              size={23}
              onPress={() => navigation.toggleDrawer()}
            />
          ),

          headerLeftContainerStyle: { padding: 15 },
        }}
      />
    </OrdersStack.Navigator>
  );
}

const MyProductsStack = createStackNavigator();

function MyProductsNavigator({ navigation }) {
  return (
    <MyProductsStack.Navigator>
      <MyProductsStack.Screen
        name="Your Products"
        component={OwnProductScreen}
        options={{
          headerLeft: () => (
            <Icon
              name="ios-menu"
              size={23}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerLeftContainerStyle: { padding: 15 },
          headerRightContainerStyle: { padding: 10 },
        }}
      />
      <MyProductsStack.Screen
        name="Edit Product"
        component={EditProductScreen}
      />
    </MyProductsStack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
        <DrawerItemList {...props} />
        <Button
          title="LOG OUT"
          onPress={() => {
            dispatch(logOut());
          }}
        />
      </SafeAreaView>
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Shop"
        component={ProductsNavigator}
        options={{ drawerIcon: () => <Entypo name="shop" size={23} /> }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{ drawerIcon: () => <Entypo name="list" size={23} /> }}
      />
      <Drawer.Screen
        name="Admin Panel"
        component={MyProductsNavigator}
        options={{ drawerIcon: () => <Ionicons name="ios-create" size={23} /> }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
