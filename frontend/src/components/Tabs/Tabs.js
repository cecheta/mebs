import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import './Tabs.scss';

const Tabs = (props) => {
  const params = new URLSearchParams(props.location.search);
  const query = params.get('q');
  const searchType = params.get('type');

  const isActive = (type) => {
    return searchType === type;
  };

  return (
    <ul className="Tabs">
      <li>
        <NavLink isActive={() => isActive('all')} to={`/search?q=${encodeURIComponent(query)}&type=all`}>
          All
        </NavLink>
      </li>
      <li>
        <NavLink isActive={() => isActive('artist')} to={`/search?q=${encodeURIComponent(query)}&type=artist`}>
          Artists
        </NavLink>
      </li>
      <li>
        <NavLink isActive={() => isActive('album')} to={`/search?q=${encodeURIComponent(query)}&type=album`}>
          Albums
        </NavLink>
      </li>
      <li>
        <NavLink isActive={() => isActive('track')} to={`/search?q=${encodeURIComponent(query)}&type=track`}>
          Songs
        </NavLink>
      </li>
    </ul>
  );
};

export default withRouter(Tabs);
