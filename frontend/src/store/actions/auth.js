import axios from 'axios';
import * as actionTypes from './actionTypes';

const JWT_EXPIRES_IN = 30; //minutes
let timeout;

export const authLogin = (token) => {
  return (dispatch) => {
    dispatch(authSaveToken(token));
    dispatch(authRefreshTimer());

    try {
      localStorage.removeItem('logout');
    } catch (err) {
      console.log('err');
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
      if (!localStorage.getItem('logout')) {
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
    const response = await axios.post('/api/auth/refresh');
    const token = response.data.jwt;
    dispatch(authLogin(token));
  };
};

export const authLogout = () => {
  clearTimeout(timeout);
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const authLoadFinish = () => {
  return {
    type: actionTypes.AUTH_LOAD_FINISH,
  };
};
