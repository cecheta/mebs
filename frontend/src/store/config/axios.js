import axios from 'axios';
import store from '../createStore';

const configureAxios = () => {
  axios.interceptors.request.use((req) => {
    const token = store.getState().auth.token;
    if (token) {
      req.headers.common.Authorization = `Bearer ${token}`;
    }

    return req;
  });
};

export default configureAxios;
