import React, { useEffect, useRef, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import axios from 'axios';
import './Account.scss';

const Account = () => {
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const requestRef = useRef({
    source: axios.CancelToken.source(),
  });

  const { albums, artists, loaded } = useSelector(
    (state) => ({
      albums: state.favourites.albums,
      artists: state.favourites.artists,
      loaded: state.favourites.loaded,
    }),
    shallowEqual
  );

  const albumIds = albums.join(',');
  const artistIds = artists.join(',');

  const query = [];
  if (albumIds) {
    query.push(`albums=${albumIds}`);
  }
  if (artistIds) {
    query.push(`artists=${artistIds}`);
  }
  const queryString = query.join('&');

  useEffect(() => {
    (async () => {
      if (loaded && !data && !error) {
        try {
          const response = await axios.get(`/api/account?${queryString}`, {
            cancelToken: requestRef.current.source.token,
          });
          setData(response.data);
        } catch (error) {
          if (!axios.isCancel(error)) {
            setError(true);
          }
        }
      }
    })();
  }, [loaded, data, error, queryString]);

  useEffect(() => {
    return () => {
      if (error) {
        setError(false);
      }
    };
  }, [error]);

  useEffect(() => {
    const source = requestRef.current.source;
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className="Account">
      <h1>My Account</h1>
    </div>
  );
};

export default Account;
