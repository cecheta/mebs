import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import './Tabs.scss';

const Tabs = (props) => {
  const params = new URLSearchParams(props.location.search);
  const query = params.get('q');

  return (
    <ul className="Tabs">
      <li>
        <Link to={`/search?q=${encodeURIComponent(query)}&type=all`}>All</Link>
      </li>
      <li>
        <Link to={`/search?q=${encodeURIComponent(query)}&type=artist`}>Artists</Link>
      </li>
      <li>
        <Link to={`/search?q=${encodeURIComponent(query)}&type=album`}>Albums</Link>
      </li>
      <li>
        <Link to={`/search?q=${encodeURIComponent(query)}&type=track`}>Songs</Link>
      </li>
    </ul>
  );
};

export default withRouter(Tabs);
