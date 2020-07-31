import React, { useEffect, useReducer, useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Input from "../Components/UI/Input";
import { useDispatch } from "react-redux";
import { signUp, signIn } from "../store/actions/auth";
import { Alert } from "react-native";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedInputValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedInputValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormValidity = true;
    for (let key in updatedInputValidities) {
      updatedFormValidity = updatedFormValidity && updatedInputValidities[key];
    }
    return {
      formIsValid: updatedFormValidity,
      inputValidities: updatedInputValidities,
      inputValues: updatedInputValues,
    };
  }
  return state;
};

function AuthScreen(props) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formStates, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
      if(error) {
          Alert.alert("An error occured!", error, [{text: "Okay"}])
      }
  }, [error])

  const authHandler = async () => {
    let action;
    if (isSignUp) {
      action = signUp(
        formStates.inputValues.email,
        formStates.inputValues.password
      );
    } else {
      action = signIn(
        formStates.inputValues.email,
        formStates.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
        await dispatch(action);
    } catch (error) {
        setError(error.message);
    }
    
    setIsLoading(false);
  };
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputIsValid) => {
      dispatchForm({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputIsValid,
        input: inputIdentifier,
      });
    },
    [dispatchForm]
  );

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={-25}
      style={styles.screen}
    >
      <LinearGradient
        colors={["#40bad5", "#035aa6"]}
        style={styles.gradientView}
      >
        <View style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="Email"
              initialValue=""
              errorText="Please enter a valid email address"
              autoCapitalize="none"
              required
              email
              keyboardType="email-address"
              onChangeInput={inputChangeHandler}
            />
            <Input
              id="password"
              label="Password"
              initialValue=""
              errorText="Please enter a valid password"
              autoCapitalize="none"
              required
              minLength={5}
              secureTextEntry
              keyboardType="default"
              onChangeInput={inputChangeHandler}
            />
            <View style={styles.btnContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#c060a1" />
              ) : (
                <Button
                  title={isSignUp ? "Sign Up" : "Sign In"}
                  color="#c060a1"
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.btnContainer}>
              <Button
                title={`Switch to ${isSignUp ? "Sign In" : "Sign Up"}`}
                color="#d63447"
                onPress={() => {
                  setIsSignUp((prevValue) => !prevValue);
                }}
              />
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradientView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  authContainer: {
    width: "100%",
    maxWidth: 400,
    maxHeight: 400,
    backgroundColor: "#fff",
    elevation: 10,
    padding: 20,
    borderRadius: 20,
  },
  btnContainer: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
  },
});

export default AuthScreen;
