import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Navigation.scss';

const Navigation = () => {
  const { token } = useSelector(
    (state) => ({
      token: state.auth.token,
    }),
    shallowEqual
  );

  return (
    <ul className="Navigation">
      <li className="Navigation__Item">
        <Link to="/" >HOME</Link>
      </li>
      {token ? (
        <>
          <li className="Navigation__Item">
            <Link to="/account">MY ACCOUNT</Link>
          </li>
          <li className="Navigation__Item">
            <Link to="/logout">LOGOUT</Link>
          </li>
        </>
      ) : (
        <li className="Navigation__Item">
          <Link to="/login">LOGIN</Link>
        </li>
      )}
    </ul>
  );
};

export default Navigation;
