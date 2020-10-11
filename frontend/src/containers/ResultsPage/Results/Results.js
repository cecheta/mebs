import React, { useState, useEffect, useReducer } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import AllItems from '../../../components/ResultsItems/AllItems/AllItems';
import Albums from '../../../components/ResultsItems/Albums/Albums';
import Artists from '../../../components/ResultsItems/Artists/Artists';
import Songs from '../../../components/ResultsItems/Songs/Songs';
import './Results.scss';

const reducer = (state, action) => {
  const result = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case 'all':
      result.all = action.data;
      return result;
    case 'artist':
      if (action.data.artists.length === 0) {
        result.artist.complete = true;
      } else if (!state.artist) {
        result.artist = {
          items: action.data.artists,
          complete: false,
        };
      } else {
        result.artist.items.push(...action.data.artists);
      }
      return result;
    case 'album':
      if (action.data.albums.length === 0) {
        result.album.complete = true;
      } else if (!state.album) {
        result.album = {
          items: action.data.albums,
          complete: false,
        };
      } else {
        result.album.items.push(...action.data.albums);
      }
      return result;
    case 'track':
      if (action.data.tracks.length === 0) {
        result.track.complete = true;
      } else if (!state.track) {
        result.track = {
          items: action.data.tracks,
          complete: false,
        };
      } else {
        result.track.items.push(...action.data.tracks);
      }
      return result;
    default:
      throw new Error();
  }
};

const Results = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchType, setSearchType] = useState('');
  const [offset, setOffset] = useState({ all: 0, artist: 0, album: 0, track: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [data, dispatch] = useReducer(reducer, {});

  let queryString = props.location.search;
  const searchParams = new URLSearchParams(queryString);
  const type = searchParams.get('type');
  const q = searchParams.get('q');

  const validType = type === 'all' || type === 'artist' || type === 'album' || type === 'track';

  if (validType && type !== searchType) {
    setSearchType(type);
  }

  useEffect(() => {
    (async () => {
      if (q && validType) {
        if ((!data[type] || scrolled) && !loading) {
          setError(false);
          setLoading(true);
          setScrolled(false);

          let searchQuery = queryString;
          if (searchQuery.includes('type=all')) {
            searchQuery = searchQuery.replace('type=all', 'type=album,artist,track');
            searchQuery += '&limit=10';
          }

          try {
            const response = await axios.get(`/api/search${searchQuery}&offset=${offset[type]}`);
            dispatch({ type, data: response.data });
          } catch (error) {
            setError(true);
          } finally {
            setLoading(false);
          }
        }
      }
    })();
  }, [q, type, validType, queryString, data, offset, scrolled, loading]);

  let results;

  if (data[type]) {
    if (type === 'all') {
      results = <AllItems data={data.all} />;
    } else if (type === 'artist') {
      results = <Artists data={data.artist.items} />;
    } else if (type === 'album') {
      results = <Albums data={data.album.items} />;
    } else if (type === 'track') {
      results = <Songs data={data.track.items} />;
    }
  } else if (error) {
    results = <div>An error has occurred...</div>;
  } else {
    results = <Spinner />;
  }

  if (!validType) {
    results = <Redirect to={`/search?q=${q}&type=all`} />;
  }

  if (!q) {
    results = <Redirect to="/" />;
  }

  const classes = ['Results'];
  if (loading) {
    classes.push('loading');
  }

  const scroll = (e) => {
    const element = e.target;
    if (type !== 'all' && !loading && !data[type].complete) {
      const percentage = ((Math.ceil(element.scrollHeight - element.scrollTop) - element.clientHeight) / element.clientHeight) * 100;
      if (percentage < 10) {
        setOffset((oldOffset) => ({
          ...oldOffset,
          [type]: oldOffset[type] + 20,
        }));
        setScrolled(true);
      }
    }
  };

  return (
    <div className={classes.join(' ')} onScroll={scroll}>
      {results}
    </div>
  );
};

export default withRouter(Results);
