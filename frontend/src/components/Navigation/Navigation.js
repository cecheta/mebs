import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './Navigation.scss';

const Navigation = (props) => {
  return (
    <ul className="Navigation">
      <li>
        <Link to="/">HOME</Link>
      </li>
      <li>
        <Link to="/account">MY ACCOUNT</Link>
      </li>
      <li>
        <Link to="/login">LOGIN</Link>
      </li>
      <li>
        <Link to="/register">REGISTER</Link>
      </li>
      <li>
        <Link to="/logout">LOGOUT</Link>
      </li>
    </ul>
  );
};

export default withRouter(Navigation);
