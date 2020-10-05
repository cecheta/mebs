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
  const [data, setData] = useState({});
  const [searchType, setSearchType] = useState(null);
  const [error, setError] = useState(false);

  let queryString = props.location.search;
  const searchParams = new URLSearchParams(queryString);
  const type = searchParams.get('type');
  const q = searchParams.get('q');

  const validType = type === 'all' || type === 'album' || type === 'artist' || type === 'track';

  useEffect(() => {
    (async () => {
      if (q && validType) {
        setSearchType(type);

        if (!data[type]) {
          setError(false);
          setLoading(true);
          let searchQuery = queryString;
          if (searchQuery.includes('type=all')) {
            searchQuery = searchQuery.replace('type=all', 'type=album,artist,track');
          }

          try {
            const response = await axios.get(`/api/search${searchQuery}`);
            setData((prevState) => ({
              ...prevState,
              [type]: response.data,
            }));
          } catch (error) {
            setError(true);
          } finally {
            setLoading(false);
          }
        }
      }
    })();
  }, [q, type, validType, queryString, data]);

  let results = loading ? <Spinner /> : null;

  if (!validType) {
    results = <Redirect to={`/search?q=${q}&type=all`} />;
  }
  if (!q) {
    results = <Redirect to="/" />;
  }

  if (error) {
    results = <div>An error has occurred...</div>;
  } else if (!loading) {
    if (searchType === 'all') {
      results = <AllItems data={data.all} />;
    } else if (searchType === 'album') {
      results = <Albums data={data.album.albums} />;
    } else if (searchType === 'artist') {
      results = <Artists data={data.artist.artists} />;
    } else if (searchType === 'track') {
      results = <Songs data={data.track.tracks} />;
    }
  }

  const classes = ['Results'];
  if (loading) {
    classes.push('loading');
  }

  return <div className={classes.join(' ')}>{results}</div>;
};

export default withRouter(Results);
