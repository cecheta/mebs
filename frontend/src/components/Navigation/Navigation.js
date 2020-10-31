import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';

const Navigation = () => {
  return (
    <ul className="Navigation">
      <li>
        <Link to="/account">MY ACCOUNT</Link>
      </li>
    </ul>
  );
};

export default Navigation;
