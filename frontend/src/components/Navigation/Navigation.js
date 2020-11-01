import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './Navigation.scss';

const Navigation = (props) => {
  return (
    <ul className="Navigation">
      {props.location.pathname !== '/account' ? (
        <li>
          <Link to="/account">MY ACCOUNT</Link>
        </li>
      ) : null}
      <li>
        <Link to="/">HOME</Link>
      </li>
    </ul>
  );
};

export default withRouter(Navigation);
