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

  useEffect(() => {
    (async () => {
      if (loaded && !data && !error) {
        try {
          let albumResponse, artistResponse;
          if (albumIds) {
            albumResponse = await axios.get(`/api/albums?ids=${albumIds}`, {
              cancelToken: requestRef.current.source.token,
            });
          }
          if (artistIds) {
            artistResponse = await axios.get(`/api/artists?ids=${artistIds}`, {
              cancelToken: requestRef.current.source.token,
            });
          }
          setData({
            albums: albumResponse?.data,
            artists: artistResponse?.data,
          });
        } catch (error) {
          if (!axios.isCancel(error)) {
            setError(true);
          }
        }
      }
    })();
  }, [loaded, data, error, albumIds, artistIds]);

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
