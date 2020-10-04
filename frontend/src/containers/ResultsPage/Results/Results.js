import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import AllItems from '../../../components/ResultsItems/AllItems/AllItems';
import Albums from '../../../components/ResultsItems/Albums/Albums';
import Artists from '../../../components/ResultsItems/Artists/Artists';
import Songs from '../../../components/ResultsItems/Songs/Songs';
import './Results.scss';

const Results = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [searchType, setSearchType] = useState(null);

  let queryString = props.location.search;
  const searchParams = new URLSearchParams(queryString);
  const type = searchParams.get('type');
  const q = searchParams.get('q');

  useEffect(() => {
    (async () => {
      if (q && type && (type === 'all' || type === 'album' || type === 'artist' || type === 'track')) {
        setLoading(true);
        setSearchType(type);
        let searchQuery = queryString;
        if (searchQuery.includes('type=all')) {
          searchQuery = searchQuery.replace('type=all', 'type=album,artist,track');
        }

        try {
          const response = await axios.get(`/api/search${searchQuery}`);
          setData(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [q, type, queryString]);

  let results = loading ? <Spinner /> : null;

  if (!type || (type !== 'all' && type !== 'album' && type !== 'artist' && type !== 'track')) {
    results = <Redirect to={`/search?q=${q}&type=all`} />;
  }
  if (!q) {
    results = <Redirect to="/" />;
  }

  if (!loading && data) {
    if (searchType === 'all') {
      results = <AllItems data={data} />;
    } else if (searchType === 'album') {
      results = <Albums data={data.albums} />;
    } else if (searchType === 'artist') {
      results = <Artists data={data.artists} />;
    } else if (searchType === 'track') {
      results = <Songs data={data.tracks} />;
    } else {
      results = null;
    }
  }

  let classes = 'Results';
  if (loading) {
    classes += ' loading';
  }

  return <div className={classes}>{results}</div>;
};

export default withRouter(Results);
