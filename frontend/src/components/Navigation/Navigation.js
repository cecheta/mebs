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
      <li>
        <Link to="/">HOME</Link>
      </li>
      {token ? (
        <>
          <li>
            <Link to="/account">MY ACCOUNT</Link>
          </li>
          <li>
            <Link to="/logout">LOGOUT</Link>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login">LOGIN</Link>
        </li>
      )}
    </ul>
  );
};

export default Navigation;
