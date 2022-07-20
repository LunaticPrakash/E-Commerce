import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_ADD,
  PRODUCT_REMOVE,
} from "../constants/productConstants";
import axios from "axios";

export const addNewProduct = (data) => async (dispatch) => {
  try {
    console.log("In dispatch, before adding to db");
    console.log(data);
    await axios.post("/api/products", data);
    console.log("Added new product to DB");
    dispatch({
      type: PRODUCT_ADD,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
}

export const saveProductDataToDB = async (id, product) => {
  // add item in sql database
  const productToSave = {
    name: product.name,
    image: product.image,
    description: product.description,
    brand: product.brand,
    category: product.category,
    price: product.price,
    countInStock: product.countInStock,
    rating:product.rating,
    numReviews:product.numReviews
  };
  await axios.put(`/api/products/${id}`, productToSave);
  console.log("updated product to DB");
};

export const updateProduct = async (dispatch, id, product) => {
  try {
    console.log("dispatching...");
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
      payload: {
        productId: id,
        productData: product,
      },
    });
    await saveProductDataToDB(id, product);
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (dispatch, id) => {
  try {
    dispatch({
      type: PRODUCT_REMOVE,
      payload: {
        productId: id,
      },
    });
    await axios.delete(`/api/products/${id}`);
    console.log(`Product with ${id} deleted`);
  } catch (error) {}
};


export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/api/products");

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
