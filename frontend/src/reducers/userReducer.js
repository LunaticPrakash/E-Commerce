import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/productConstants";

export const userLoginReducer = (
  state = { userDetails: null, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };

    case USER_LOGIN_SUCCESS:
      return {...state,
        loading: false,
        userDetails: action.payload,
        error: false,
      };

    case USER_LOGIN_FAILURE:
      return {
        loading: false,
        error: action.payload,
        userDetails: null,
      };

    case USER_LOGOUT:
      return { userDetails: null, loading: false, error: null };

    default:
      return state;
  }
};
