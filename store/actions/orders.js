import Order from "../../models/order-item";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const addOrder = (cartItems, total) => {
  const date = new Date();
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://shopapp-e1297.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          total,
          date: date.toISOString(),
        }),
      }
    );

    const resData = await response.json();
    if (!response.ok) {
      throw new Error("Something went Wrong !");
    }

    dispatch({
      type: ADD_ORDER,
      id: resData.name,
      items: cartItems,
      totalAmt: total,
      date: date,
    });
  };
};

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://shopapp-e1297.firebaseio.com/orders/${userId}.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].total,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders,
      });
    } catch (error) {
      //send to custom analytics server
      throw error;
    }
  };
};
