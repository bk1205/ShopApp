import React, { useState, useCallback, useEffect, useReducer } from "react";
import { View, Text, TextInput, Alert, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import { updateProduct, createProduct } from "../store/actions/products";
import Input from "../Components/UI/Input";

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
    // console.log(updatedFormValidity)
    return {
      formIsValid: updatedFormValidity,
      inputValidities: updatedInputValidities,
      inputValues: updatedInputValues,
    };
  }
  return state;
};

function EditProducts(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const { productId } = props.route.params;
  // console.log(productId);
  const editedProduct = useSelector((state) =>
    state.products.ownProducts.find((product) => product.id === productId)
  );
  const dispatch = useDispatch();

  const [formStates, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if(error) {
      Alert.alert("An error occured", error, [{text: "Okay"}])  
    }
  }, [error])

  const submitHandler = useCallback(async () => {
    if (!formStates.formIsValid) {
      Alert.alert("Wrong Input !", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedProduct) {
        console.log("here");
        console.log(formStates.inputValues);
        await dispatch(
          updateProduct(
            productId,
            formStates.inputValues.title,
            formStates.inputValues.description,
            formStates.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          createProduct(
            formStates.inputValues.title,
            formStates.inputValues.description,
            formStates.inputValues.imageUrl,
            formStates.inputValues.price
          )
        );
      }
      props.navigation.goBack();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
    
  }, [dispatch, productId, formStates]);

  useEffect(() => {
    props.navigation.dispatch(
      CommonActions.setParams({ submit: submitHandler })
    );
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputIsValid) => {
      console.log(inputIdentifier);
      console.log(inputValue);
      console.log(inputIsValid);
      dispatchForm({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputIsValid,
        input: inputIdentifier,
      });
    },
    [dispatchForm]
  );

  props.navigation.setOptions({
    headerTitle: productId ? "Edit Product" : "Add Product",
    headerRight: () => (
      <Ionicons
        name="md-checkmark"
        size={35}
        color="green"
        onPress={props.route.params?.submit}
      />
    ),
    headerRightContainerStyle: { padding: 10 },
  });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.form}>
      <Input
        id="title"
        label="Title"
        keyboardType="default"
        returnKeyType="next"
        autoCorrect
        autoCapitalize="sentences"
        onChangeInput={inputChangeHandler}
        initialValue={editedProduct ? editedProduct.title : ""}
        initiallyValid={!!editedProduct}
        required
        minLength={2}
        errorText="Please enter valid title!"
      />
      <Input
        id="imageUrl"
        label="Image Url"
        keyboardType="default"
        returnKeyType="next"
        onChangeInput={inputChangeHandler}
        initialValue={editedProduct ? editedProduct.imageUrl : ""}
        initiallyValid={!!editedProduct}
        required
        errorText="Please enter valid image url!"
      />
      {editedProduct ? null : (
        <Input
          id="price"
          label="Price"
          keyboardType="decimal-pad"
          returnKeyType="next"
          onChangeInput={inputChangeHandler}
          required
          min={1}
          errorText="Please enter valid price!"
        />
      )}
      <Input
        id="description"
        label="description"
        keyboardType="default"
        returnKeyType="next"
        autoCorrect
        autoCapitalize="sentences"
        multiline
        numberOfLines={3}
        onChangeInput={inputChangeHandler}
        initialValue={editedProduct ? editedProduct.description : ""}
        initiallyValid={!!editedProduct}
        required
        minLength={2}
        errorText="Please enter valid description!"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProducts;
