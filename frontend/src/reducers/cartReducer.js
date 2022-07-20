import {
  CART_DETAILS_SUCCESS,
  CART_DETAILS_FAILURE,
  CART_DETAILS_REQUEST,
  CART_ADD_ITEM,
  CART_UPDATE_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SHIPPING_ADDRESS_SUCCESS,
} from "../constants/productConstants";

const initialState = {
  cartItems: [],
  shippingAddress: null,
  loading: true,
  error: null,
};
export const cartDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_DETAILS_REQUEST:
      return { loading: true, ...state };

    case CART_DETAILS_SUCCESS:
      return {...state,
        loading: false,
        cartItems: action.payload,
        error: false,
      };

    case CART_DETAILS_FAILURE:
      return {...state,
        loading: false,
        error: action.payload,
        cartItems: null,
      };

    case CART_ADD_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case CART_UPDATE_ITEM:
      const c = state.cartItems;
      c.forEach((i) => {
        if (i.productId == action.payload.productId) {
          i.productQuantity = action.payload.productQuantity;
        }
      });

      return {
        ...state,
        cartItems: c,
      };

    case CART_REMOVE_ITEM:
      const d = state.cartItems;
      for (let i = 0; i < d.length; i++) {
        console.log(d[i].productId);
        if (d[i].productId == action.payload.productId) {
          d.splice(i, 1);
          console.log("Item deleted!");
        }
      }
      return {
        ...state,
        cartItems: d,
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SHIPPING_ADDRESS_SUCCESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    default:
      return state;
  }
};
