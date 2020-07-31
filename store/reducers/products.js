import PRODUCTS from "../../data/4.1 dummy-data.js";
import {
  ADD_TO_CART,
  INC_QTY,
  DEC_QTY,
  REMOVE_ITEM,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCT,
  SET_PRODUCTS,
} from "../actions/products.js";
import { ADD_ORDER } from "../actions/orders.js";
import Product from "../../models/product.js";

const initialState = {
  products: [],
  cartProducts: [],
  ownProducts: [],
  total: 0,
};

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      let existingIndex = state.cartProducts.findIndex(
        (prod) => prod.id === action.id
      );
      let product = state.products.find((product) => product.id === action.id);
      let updatedCart;

      if (existingIndex >= 0) {
        product.qty += 1;
        updatedCart = [...state.cartProducts];
      } else {
        updatedCart = state.cartProducts.concat(product);
      }
      return {
        ...state,
        cartProducts: updatedCart,
        total: state.total + product.price,
      };

    case INC_QTY:
      product = state.products.find((product) => product.id === action.id);
      product.qty += 1;
      return {
        ...state,
        total: state.total + product.price,
      };

    case DEC_QTY:
      product = state.products.find((product) => product.id === action.id);
      let totalAmt;
      
      if (product.qty > 1) {
        product.qty -= 1;
        updatedCart = [...state.cartProducts];
        totalAmt = state.total - product.price;
      } else {
        existingIndex = state.cartProducts.findIndex(
          (prod) => prod.id === action.id
        );
        updatedCart = [...state.cartProducts];
        updatedCart.splice(existingIndex, 1);
        totalAmt = state.total - product.price;
      }
      return {
        ...state,
        cartProducts: updatedCart,
        total: totalAmt,
      };

    case REMOVE_ITEM:
      product = state.products.find((product) => product.id === action.id);
      existingIndex = state.cartProducts.findIndex(
        (prod) => prod.id === action.id
      );
      updatedCart = [...state.cartProducts];
      updatedCart.splice(existingIndex, 1);
      return {
        ...state,
        cartProducts: updatedCart,
        total: state.total - product.qty * product.price,
      };

    case ADD_ORDER:
      return initialState;

    case SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
        ownProducts: action.userProducts
      }  

    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.id,
        action.ownerId,
        action.title,
        action.imageUrl,
        action.description,
        action.price,
        1
      );
      return {
        ...state,
        products: state.products.concat(newProduct),
        ownProducts: state.ownProducts.concat(newProduct),
      };

    case UPDATE_PRODUCT:
      console.log(action);
      const userProductIndex = state.ownProducts.findIndex(prod => {prod.id === action.pId});
      console.log(userProductIndex)
      const updatedProduct = new Product(
        action.pId,
        state.ownProducts[userProductIndex].ownerId,
        action.title,
        action.imageUrl,
        action.description,
        state.ownProducts[userProductIndex].price,
        state.ownProducts[userProductIndex].qty
      );
      const updatedUserProducts = [...state.ownProducts];
      updatedUserProducts[userProductIndex] = updatedProduct;
      const availableProductIndex = state.products.findIndex(prod => prod.id === action.pId);
      const updatedAvailableProducts = [...state.products];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      console.log(updatedProduct);
      return {
        ...state,
        products: updatedAvailableProducts,
        ownProducts: updatedUserProducts
      }

    case DELETE_PRODUCT:
      product = state.products.find((product) => product.id === action.pId);
      const isPresentProduct = state.cartProducts.includes(product);
      if (isPresentProduct) {
        const updatedTotal = state.total - product.qty * product.price;
        existingIndex = state.cartProducts.findIndex(
          (prod) => prod.id === action.pId
        );
        updatedCart = [...state.cartProducts];
        updatedCart.splice(existingIndex, 1);
        return {
          ...state,
          products: state.products.filter(
            (product) => product.id !== action.pId
          ),
          cartProducts: updatedCart,
          ownProducts: state.ownProducts.filter(
            (product) => product.id !== action.pId
          ),
          total: updatedTotal,
        };
      } else {
        return {
          ...state,
          products: state.products.filter(
            (product) => product.id !== action.pId
          ),
          ownProducts: state.ownProducts.filter(
            (product) => product.id !== action.pId
          ),
        };
      }

    default:
      return state;
  }
}

export default productsReducer;
