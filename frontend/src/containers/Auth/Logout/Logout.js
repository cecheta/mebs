import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions';

const Logout = () => {
  const dispatch = useDispatch();
  dispatch(actions.authLogout());

  return (
    <Redirect to="/" />
  );
};

export default Logout;