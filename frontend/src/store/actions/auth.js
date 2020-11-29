import axios from 'axios';
import * as actionTypes from './actionTypes';

const JWT_EXPIRES_IN = 30; //minutes

export const authLogin = (token) => {
  return (dispatch) => {
    dispatch(authSaveToken(token));
    dispatch(authRefreshTimer());
  };
};

export const authSaveToken = (token) => {
  return {
    type: actionTypes.AUTH_SAVE_TOKEN,
    token,
  };
};

const authRefreshTimer = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authRefresh());
    }, (JWT_EXPIRES_IN - 0.5) * 60 * 1000);
  };
};

const authRefresh = () => {
  return async (dispatch) => {
    const response = await axios.post('/api/auth/refresh');
    const token = response.data.jwt;
    dispatch(authLogin(token));
  };
};
