import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions';
import './Register.scss';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const usernameChangedHandler = (e) => {
    setUsername(e.target.value);
  };

  const emailChangedHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangedHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post('/api/auth/register', payload);
      const token = response.data.jwt;

      dispatch(actions.authSaveToken(token));
      history.push('/account');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Register">
      <h2>Register</h2>
      <form onSubmit={submitHandler}>
        <div className="input">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={username} placeholder="Username" onChange={(e) => usernameChangedHandler(e)} />
        </div>
        <div className="input">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={email} placeholder="Email" onChange={(e) => emailChangedHandler(e)} />
        </div>
        <div className="input">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={password} placeholder="Password" onChange={(e) => passwordChangedHandler(e)} />
        </div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Register;
