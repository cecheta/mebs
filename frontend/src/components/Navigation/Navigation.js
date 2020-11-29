import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './Navigation.scss';

const Navigation = (props) => {
  const { loggedIn } = useSelector(
    (state) => ({
      loggedIn: state.auth.loggedIn,
    }),
    shallowEqual
  );

  return (
    <ul className="Navigation">
      <li>
        <Link to="/">HOME</Link>
      </li>
      {loggedIn ? (
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

export default withRouter(Navigation);
