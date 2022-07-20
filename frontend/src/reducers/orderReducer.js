import {
  ORDER_ADD_ITEM,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../constants/productConstants";

const initialState = {
  orderItems: [],
  loading: true,
  error: null,
};
export const OrderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true, ...state };

    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        orderItems: action.payload,
        error: false,
      };

    case ORDER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        orderItems: null,
      };

    case ORDER_ADD_ITEM:
      return {
        ...state,
        orderItems: [...state.orderItems, action.payload],
      };

    default:
      return state;
  }
};
