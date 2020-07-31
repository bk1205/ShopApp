import Product from "../../models/product";

export const ADD_TO_CART = "ADD_TO_CART";
export const INC_QTY = "INC_QTY";
export const DEC_QTY = "DEC_QTY";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const addToCart = (productId) => {
  return {
    type: ADD_TO_CART,
    id: productId,
  };
};

export const increaseQuantity = (productId) => {
  return {
    type: INC_QTY,
    id: productId,
  };
};

export const decreaseQuantity = (productId) => {
  return {
    type: DEC_QTY,
    id: productId,
  };
};

export const removeItem = (itemId) => {
  return {
    type: REMOVE_ITEM,
    id: itemId,
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const response =  await fetch(`https://shopapp-e1297.firebaseio.com/products/${id}.json?auth=${token}`, {
      method: "DELETE",
    });
    if(!response.ok) {
      throw new Error("Something went Wrong !");
    }
    dispatch({
      type: DELETE_PRODUCT,
      pId: id,
    });
  };
};

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://shopapp-e1297.firebaseio.com/products.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            Number(resData[key].price),
            1
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
      });
    } catch (error) {
      //send to custom analytics server
      throw error;
    }
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    // any async code can be written now...
    const response = await fetch(
      `https://shopapp-e1297.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
          qty: 1
        }),
      }
    );

    const resData = await response.json();
    // console.log(resData);
    if(!response.ok) {
      throw new Error("Something went Wrong !");
    }

    dispatch({
      type: CREATE_PRODUCT,
      id: resData.name,
      title,
      description,
      imageUrl,
      price,
      ownerId: userId
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  // console.log(id);
  // console.log(title);
  // console.log(description);
  // console.log(imageUrl);
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const response = await fetch(`https://shopapp-e1297.firebaseio.com/products/${id}.json?auth=${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
      }),
    });
    if(!response.ok) {
      throw new Error("Something went Wrong !");
    }
    
    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      title,
      description,
      imageUrl,
    });
  };
};
