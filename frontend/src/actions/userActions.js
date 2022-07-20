import axios from "axios";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/productConstants";

export const login = async (dispatch, email, password) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    // data -> userDetails + success or error
    const { data } = await axios.post("/login", {
      userName: email,
      userPassword: password,
    });

    if (data.jwtToken.length) {
      console.log("Success Login");
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.user,
      });

      console.log("saving user data to localstorage");
      localStorage.setItem("userInfo", JSON.stringify(data));
    } else {
      console.log("Failed Login");
      dispatch({
        type: USER_LOGIN_FAILURE,
        payload: data.error,
      });
    }
  } catch (error) {}
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // data -> userDetails + success or error
    const { data } = await axios.post("/register", userData, config);
    console.log(data);

    if (data.id) {
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data.userDetails,
      });
    } else {
      dispatch({
        type: USER_REGISTER_FAILURE,
        payload: data.error,
      });
    }

    return data;
  } catch (error) {}
};
