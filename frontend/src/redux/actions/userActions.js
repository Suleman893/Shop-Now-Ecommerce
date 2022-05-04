import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstant";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({type: LOGIN_REQUEST});
    const config = {headers: {"Content-Type": "application/json"}};
    const {data} = await axios.post("api/"(email, password), config);
    dispatch({type: LOGIN_SUCCESS, payload: data.user});
  } catch (error) {
    dispatch({type: LOGIN_FAIL, payload: error.response.data.message});
  }
};

export const register = (email, password) => async (dispatch) => {
  try {
    dispatch({type: REGISTER_REQUEST});
    const config = {headers: {"Content-Type": "application/json"}};
    const {data} = await axios.post("api/"(email, password), config);
    dispatch({type: REGISTER_SUCCESS, payload: data.user});
  } catch (error) {
    dispatch({type: REGISTER_FAIL, payload: error.response.data.message});
  }
};

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};