import React, { useRef, useEffect } from "react";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { useSelector } from "react-redux";

import ProductsNavigator from "../navigation/productsNavigator"


function Navigation() {
    const navRef = useRef();
    const isAuth = useSelector(state => !!state.auth.token);
    useEffect(() => {
        if(!isAuth) {
            console.log("hello")
            navRef.current?.navigate('Authentication');
        }
    }, [isAuth])


  return (
    <NavigationContainer ref={navRef} >
      <ProductsNavigator />
    </NavigationContainer>
  );
}

export default Navigation;
