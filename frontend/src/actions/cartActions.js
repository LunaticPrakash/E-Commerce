import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_DETAILS_REQUEST,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_FAILURE,
  CART_UPDATE_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SHIPPING_ADDRESS_REQUEST,
  CART_SHIPPING_ADDRESS_SUCCESS,
  CART_SHIPPING_ADDRESS_FAILURE,
} from "../constants/productConstants";

export const saveCartDataToDB = async (id, qty, userId, token) => {
  // add item in sql database
  const cartItemToSave = {
    userId: userId,
    productId: id,
    productQuantity: qty,
  };
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};
  await axios.post("/api/cart", cartItemToSave, config);
  console.log("Saved cart item to DB");
};

export const saveShippingAddressDataToDB = async (userId, address) => {
  // add item in sql database
  const shippingAddressToSave = {
    userId: 1,
    shippingAddress: address,
  };
};

// get the shipping address data and dispatch corresponding action
export const saveShippingAddress = (data, userId,token) => async (dispatch) => {
  try {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    console.log("In dispatch, before saving to db");
    await axios.post("/api/shippingAddress", { ...data, userId: userId }, config);
    console.log("Saved Shipping Address to DB");
  } catch (error) {
    console.log(error);
  }
};

export const getShippingAddress = (userId, token) => async (dispatch) => {
  try {
    dispatch({ type: CART_SHIPPING_ADDRESS_REQUEST });
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    const { data } = await axios.get(`/api/shippingAddress/${userId}`, config);
    dispatch({
      type: CART_SHIPPING_ADDRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_SHIPPING_ADDRESS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get the product id and the quantity of the item to add to the cart
export const addItem = async (dispatch, id, qty, userId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    const { data } = await axios.get(`/api/products/${id}`, config);
    // add item in redux
    console.log(`Saving product with id ${id} for userId ${userId}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        productId: data.id,
        productQuantity: qty,
        userId: userId,
      },
    });

    //import {v4} from 'uuid'; => v4()
    // add item in sql database
    saveCartDataToDB(id, qty, userId, token);
  } catch (error) {
    console.error(error);
  }
};

export const updateItem = (dispatch, id, qty, userId, token) => {
  try {
    // update item in redux
    dispatch({
      type: CART_UPDATE_ITEM,
      payload: {
        productId: id,
        productQuantity: qty,
        userId: userId,
      },
    });
    saveCartDataToDB(id, qty, token);
  } catch (error) {
    console.error(error);
  }
};

export const removeItem = async (dispatch, id, token) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: {
        productId: id,
      },
    });
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    axios.delete(`/api/cart/${id}`, config);
  } catch (error) {}
};

export const listCartItems = (userId, token) => async (dispatch) => {
  try {
    dispatch({ type: CART_DETAILS_REQUEST });
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    const { data } = await axios.get(`/api/cart/${userId}`, config);
    dispatch({
      type: CART_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
