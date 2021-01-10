import React, { useState, useEffect, useLayoutEffect, useReducer, useRef } from 'react';
import axios from 'axios';
import Spinner from '../UI/Spinner';
import All from './components/All';
import Albums from './components/Albums';
import Artists from './components/Artists';
import Songs from './components/Songs';
import './Results.scss';

const reducer = (state, action) => {
  const result = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case 'all':
      result.all = action.data;
      return result;
    case 'artist':
      if (!result.artist) {
        result.artist = action.data.artists;
      } else {
        result.artist.items.push(...action.data.artists.items);
        result.artist.items = result.artist.items.filter((item, i, arr) => { // REMOVE DUPLICATES, NEEDS REFACTOR
          return i === arr.findIndex((t) => t.id === item.id);
        });
        result.artist.complete = action.data.artists.complete;
      }
      return result;
    case 'album':
      if (!result.album) {
        result.album = action.data.albums;
      } else {
        result.album.items.push(...action.data.albums.items);
        result.album.items = result.album.items.filter((item, i, arr) => {
          return i === arr.findIndex((t) => t.id === item.id);
        });
        result.album.complete = action.data.albums.complete;
      }
      return result;
    case 'track':
      if (!result.track) {
        result.track = action.data.tracks;
      } else {
        result.track.items.push(...action.data.tracks.items);
        result.track.items = result.track.items.filter((item, i, arr) => {
          return i === arr.findIndex((t) => t.id === item.id);
        });
        result.track.complete = action.data.tracks.complete;
      }
      return result;
    default:
      throw new Error();
  }
};

const Results = ({ valid, type, query }) => {
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
  let loadingRef = useRef(true);

  useEffect(() => {
    (async () => {
      if (query && valid) {
        if ((!data[type] || scrolled) && !error) {
          loadingRef.current = true;
          setScrolled(false);

          try {
            const searchQuery = encodeURIComponent(query);
            const searchType = type === 'all' ? 'album,artist,track' : type;
            const response = await axios.get(`/api/search?query=${searchQuery}&type=${searchType}&offset=${offset[type]}`, {
              cancelToken: requestRef.current.source.token,
            });
            loadingRef.current = false;
            dispatch({ type, data: response.data });
          } catch (error) {
            if (!axios.isCancel(error)) {
              loadingRef.current = false;
              setError(true);
            }
          }
        }
      }
    })();
  }, [query, type, valid, data, offset, scrolled, error]);

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
    if (valid && domRef.current) {
      domRef.current.scrollTop = positionRef.current.position[type];
    }
  }, [type, valid]);

  let results;
  if (data[type]) {
    if (type === 'all') {
      results = <All albums={data.all.albums.items} artists={data.all.artists.items} songs={data.all.tracks.items} />;
    } else if (type === 'artist') {
      results = <Artists artists={data.artist.items} />;
    } else if (type === 'album') {
      results = <Albums albums={data.album.items} />;
    } else if (type === 'track') {
      results = <Songs songs={data.track.items} />;
    }
  } else if (error) {
    results = (
      <div>
        An error has occurred...
        <button onClick={() => setError(false)}>Try again</button>
      </div>
    );
  }

  const classes = ['Results'];
  if (!data[type] && !error) {
    classes.push('loading');
  }

  const scrollHandler = (e) => {
    const element = e.target;
    if (type !== 'all' && !loadingRef.current && !scrolled) {
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

  const showSpinner = (type !== 'all' && !data[type]?.complete) || (type === 'all' && !data[type]);

  return (
    <div className={classes.join(' ')} onScroll={scrollHandler} ref={domRef}>
      {results}
      {showSpinner ? <Spinner /> : null}
    </div>
  );
};

export default Results;
