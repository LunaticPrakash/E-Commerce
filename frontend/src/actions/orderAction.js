import axios from "axios";
import {
  ORDER_ADD_ITEM,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../constants/productConstants";
import { updateProduct } from "./productActions";

export const listOrderedItems = (userId, token) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.get(`/api/orders/${userId}`, config);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const saveOrderDataToDB = async (
  id,
  name,
  price,
  productQuantity,
  orderDate,
  userId,
  token
) => {
  // add item in sql database
  const orderItemToSave = {
    productId: id,
    productName: name,
    productPrice: price,
    productQuantity: productQuantity,
    userId: userId,
    orderDate: orderDate,
    paymentStatus:"undefined",
    transactionId:"undefined"
  };
  console.log("token in orderAction = ", token);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.post("/api/order", orderItemToSave, config);
  console.log("res = ", res);
  console.log("Saved order to DB");
};

export const addOrder = async (
  dispatch,
  allCartProducts,
  userId,
  orderDate,
  totalPrice,
  paymentStatus,
  transactionId,
  token
) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // add item in redux
    allCartProducts.forEach((data) => {
      dispatch({
        type: ORDER_ADD_ITEM,
        payload: {
          productId: data.id,
          productName: data.name,
          productPrice: data.price,
          productQuantity: data.productQuantity,
          userId: userId,
          orderDate: orderDate,
          paymentStatus:"undefined",
          transactionId:"undefined"
        },
      });
      
      // const productData = {
      //   name: data.name,
      //   image: data.image,
      //   description: data.description,
      //   brand: data.brand,
      //   category: data.category,
      //   price: data.price,
      //   countInStock: data.countInStock,
      //   rating: data.product.rating,
      //   numReviews: data.product.numReviews,
      // };

      data = {...data, countInStock:data.countInStock - data.productQuantity}
      updateProduct(dispatch, data.id, data);
      saveOrderDataToDB(
        data.id,
        data.name,
        data.price,
        data.productQuantity,
        orderDate,
        userId,
        token
      );
    });

    // //import {v4} from 'uuid'; => v4()
    // // add item in sql database
  } catch (error) {
    console.error(error);
  }
};
