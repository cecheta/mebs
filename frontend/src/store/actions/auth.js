import axios from 'axios';
import * as actions from '.';
import * as actionTypes from './actionTypes';

const JWT_EXPIRES_IN = 30; //minutes
let timeout;

export const authLogin = (token) => {
  return (dispatch) => {
    dispatch(authSaveToken(token));
    dispatch(authRefreshTimer());

    try {
      localStorage.setItem('loggedin', true);
    } catch (err) {
      console.log(err);
    }
  };
};

const authSaveToken = (token) => {
  return {
    type: actionTypes.AUTH_SAVE_TOKEN,
    token,
  };
};

const authRefreshTimer = () => {
  return (dispatch) => {
    timeout = setTimeout(() => {
      dispatch(authRefresh());
    }, (JWT_EXPIRES_IN - 0.5) * 60 * 1000);
  };
};

export const authLoadRefresh = () => {
  return async (dispatch) => {
    try {
      if (localStorage.getItem('loggedin')) {
        await dispatch(authRefresh());
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(authLoadFinish());
    }
  };
};

const authRefresh = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/auth/refresh');
      const token = response.data.jwt;
      dispatch(authLogin(token));
    } catch (err) {
      try {
        localStorage.removeItem('loggedin');
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export const authLogout = () => {
  return (dispatch) => {
    clearTimeout(timeout);
    dispatch(actions.clearFavourites());
    dispatch(authClearToken());
  };
};

const authClearToken = () => {
  return {
    type: actionTypes.AUTH_CLEAR_TOKEN,
  };
};

const authLoadFinish = () => {
  return {
    type: actionTypes.AUTH_LOAD_FINISH,
  };
};
