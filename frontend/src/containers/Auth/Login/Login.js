import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions';
import './Login.scss';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const nameChangedHandler = (e) => {
    setName(e.target.value);
  };

  const passwordChangedHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {};
    if (name.includes('@')) {
      payload.email = name;
    } else {
      payload.username = name;
    }
    payload.password = password;

    try {
      const response = await axios.post('/api/auth/login', payload);
      const token = response.data.jwt;

      dispatch(actions.authLogin(token));
      history.push('/account')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <div className="input">
          <label htmlFor="name">Username or Email</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => nameChangedHandler(e)} />
        </div>
        <div className="input">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => passwordChangedHandler(e)} />
        </div>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
