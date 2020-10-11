import React, { useState, useEffect, useLayoutEffect, useReducer, useRef } from 'react';
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
      if (action.data.artists.length === 0 && result.artist) {
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
      if (action.data.albums.length === 0 && result.album) {
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
      if (action.data.tracks.length === 0 && result.track) {
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
  const [offset, setOffset] = useState({ all: 0, artist: 0, album: 0, track: 0 });
  const [scrolled, setScrolled] = useState(false);

  const [data, dispatch] = useReducer(reducer, {});

  const positionRef = useRef({
    position: {
      artist: 0,
      album: 0,
      track: 0,
    },
  });
  const requestRef = useRef({
    source: axios.CancelToken.source(),
  });
  const domRef = useRef(null);

  const type = props.type;
  const q = props.query;

  useEffect(() => {
    (async () => {
      if (q && props.valid) {
        if ((!data[type] || scrolled) && !loading && !error) {
          setLoading(true);
          setScrolled(false);

          try {
            const searchQuery = encodeURIComponent(q);
            const searchType = type === 'all' ? 'album,artist,track' : type;
            const response = await axios.get(`/api/search?q=${searchQuery}&type=${searchType}&offset=${offset[type]}`, {
              cancelToken: requestRef.current.source.token,
            });
            dispatch({ type, data: response.data });
            setLoading(false);
          } catch (error) {
            if (!axios.isCancel(error)) {
              setError(true);
              setLoading(false);
            }
          }
        }
      }
    })();
  }, [q, type, props.valid, data, offset, scrolled, loading, error]);

  useEffect(() => {
    return () => {
      if (error) {
        setError(false);
      }
    };
  }, [type, error]);

  useEffect(() => {
    const source = requestRef.current.source;
    return () => {
      source.cancel();
    };
  }, []);

  useLayoutEffect(() => {
    if (props.valid && domRef.current) {
      domRef.current.scrollTop = positionRef.current.position[type];
    }
  }, [type, props.valid]);

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

  const classes = ['Results'];
  if (loading) {
    classes.push('loading');
  }

  const scrollHandler = (e) => {
    const element = e.target;
    if (type !== 'all' && !loading) {
      positionRef.current.position[type] = element.scrollTop;

      if (data[type] && !data[type].complete) {
        const percentage = ((Math.ceil(element.scrollHeight - element.scrollTop) - element.clientHeight) / element.clientHeight) * 100;
        if (percentage < 100) {
          setOffset((oldOffset) => ({
            ...oldOffset,
            [type]: oldOffset[type] + 20,
          }));
          setScrolled(true);
        }
      }
    }
  };

  return (
    <div className={classes.join(' ')} onScroll={scrollHandler} ref={domRef}>
      {results}
    </div>
  );
};

export default Results;
