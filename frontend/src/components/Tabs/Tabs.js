import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Tabs.scss';

const Tabs = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const query = params.get('q');
  const searchType = params.get('type');

  const isActive = (type) => {
    return searchType === type;
  };

  return (
    <ul className="Tabs">
      <Tab active={() => isActive('all')} to={`/search?q=${encodeURIComponent(query)}&type=all`}>
        All
      </Tab>
      <Tab active={() => isActive('artist')} to={`/search?q=${encodeURIComponent(query)}&type=artist`}>
        Artist
      </Tab>
      <Tab active={() => isActive('album')} to={`/search?q=${encodeURIComponent(query)}&type=album`}>
        Album
      </Tab>
      <Tab active={() => isActive('track')} to={`/search?q=${encodeURIComponent(query)}&type=track`}>
        Songs
      </Tab>
    </ul>
  );
};

const Tab = (props) => {
  return (
    <li className={props.active() ? 'Tab active' : 'Tab'}>
      <Link to={props.to} className="Tab__Link">
        {props.children}
      </Link>
    </li>
  );
};

export default Tabs;
