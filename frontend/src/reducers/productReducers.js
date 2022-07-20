import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_ADD,
} from "../constants/productConstants";

const initialState = { products: [], loading: true, error: null };

export const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, ...state };

    case PRODUCT_LIST_SUCCESS:
      return {...state,
        loading: false,
        products: action.payload,
        error: false,
      };

    case PRODUCT_LIST_FAILURE:
      return {...state,
        loading: false,
        error: action.payload,
        products: null,
      };

    case PRODUCT_ADD:
      console.log([...state.products, action.payload]);
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { reviews: [], error: null },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, products: [] };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case PRODUCT_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case PRODUCT_UPDATE_REQUEST:
      const p = state.products;
      //   p.forEach((i) => {
      //     if (i.id == action.payload.productId) {
      p.name = action.payload.productData.name;
      p.image = action.payload.productData.image;
      p.description = action.payload.productData.description;
      p.brand = action.payload.productData.brand;
      p.category = action.payload.productData.category;
      p.price = action.payload.productData.price;
      p.countInStock = action.payload.productData.countInStock;

      console.log(p);
      //     }
      //   });

      return {
        ...state,
        products: p,
      };

    default:
      return state;
  }
};
