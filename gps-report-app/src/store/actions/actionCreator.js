import axios from "axios";
import { baseURL } from "../../constants/url";
import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  SHOW_DATA,
  SHOW_DATA_BY_ID,
} from "./actionType";

//! Login
export const loginSuccess = (payload) => {
  return {
    type: USER_LOGIN,
    err: payload.err,
  };
};
export const login = (input) => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = input;
      const options = {
        method: "POST",
        url: `${baseURL}/api/login`,
        data: {
          email,
          password,
        },
      };
      const { data } = await axios(options);
      localStorage.setItem("login_token", data.response.loginToken);
      const payload = { err: "" };
      return dispatch(loginSuccess(payload));
    } catch (err) {
      const payload = { err };
      return dispatch(loginSuccess(payload));
    }
  };
};

//! Logout
export const logoutSuccess = (payload) => {
  return {
    type: USER_LOGOUT,
    err: payload.err,
    msg: payload.msg,
  };
};
export const logout = () => {
  return async (dispatch, getState) => {
    try {
      const options = {
        method: "POST",
        url: `${baseURL}/api/logout`,
        headers: {
          loginToken: localStorage.getItem("login_token"),
        },
      };
      const { data } = await axios(options);

      localStorage.clear();
      const payload = { err: "", msg: data.message };
      return dispatch(logoutSuccess(payload));
    } catch (err) {
      const payload = { err };
      return dispatch(logoutSuccess(payload));
    }
  };
};

//! Register
export const registerSuccess = (payload) => {
  return {
    type: USER_REGISTER,
    err: payload.err,
  };
};
export const register = (input) => {
  return async (dispatch, getState) => {
    try {
      const { name, email, password } = input;
      const options = {
        method: "POST",
        url: `${baseURL}/api/signup`,
        data: {
          name,
          email,
          password,
        },
      };
      await axios(options);
      const payload = { err: "" };
      return dispatch(registerSuccess(payload));
    } catch (err) {
      const payload = { err };
      return dispatch(registerSuccess(payload));
    }
  };
};

//! Fetch data
export const fetchDataSuccess = (payload) => {
  return {
    type: SHOW_DATA,
    err: payload.err,
    payload,
  };
};
export const fetchData = (page, q, id, type) => {
  return async (dispatch, getState) => {
    try {
      if (!!q) page = 1;

      const options = {
        method: "GET",
        url: `${baseURL}/api?page=${page}&q=${q}&type=${type}&id=${id}`,
        headers: {
          loginToken: localStorage.getItem("login_token"),
        },
      };
      const { data } = await axios(options);
      const result = { data, err: "" };
      return dispatch(fetchDataSuccess(result));
    } catch (err) {
      const payload = { err: err.response.data.message };
      return dispatch(fetchDataSuccess(payload));
    }
  };
};

//! Fetch data by id
export const fetchDataByIdSuccess = (payload) => {
  return {
    type: SHOW_DATA_BY_ID,
    err: payload.err,
    payload,
  };
};
export const fetchDataById = (id) => {
  return async (dispatch, getState) => {
    try {
      const options = {
        method: "GET",
        url: `${baseURL}/api/${id}`,
        headers: {
          loginToken: localStorage.getItem("login_token"),
        },
      };
      const { data } = await axios(options);
      const result = { data, err: "" };
      return dispatch(fetchDataByIdSuccess(result));
    } catch (err) {
      const payload = { err: err.response.data.message };
      return dispatch(fetchDataByIdSuccess(payload));
    }
  };
};
