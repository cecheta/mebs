import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions';

const Logout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(actions.authLogout());
    try {
      localStorage.removeItem('loggedin');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    logout();
  });

  return <Redirect to="/" />;
};

export default Logout;
