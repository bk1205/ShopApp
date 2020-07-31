import { ADD_ORDER, SET_ORDERS } from "../actions/orders";
import Order from "../../models/order-item";

const initialState = {
  items: [],
};

function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDERS: 
    return {
      items: action.orders
    }  
    case ADD_ORDER:
      const orderItem = new Order(
        action.id,
        action.items,
        action.totalAmt,
        action.date
      );
      return {
         ...state,
         items: state.items.concat(orderItem)
      }

    default:
      return state;
  }
}
export default ordersReducer;
