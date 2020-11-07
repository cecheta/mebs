import React, { useEffect, useRef, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import axios from 'axios';
import Album from '../../components/AccountItems/Album/Album';
import Artist from '../../components/AccountItems/Artist/Artist';
import Spinner from '../../components/UI/Spinner/Spinner';
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

  let albumItems, artistItems;
  if (data) {
    albumItems = data.albums.map((album) => <Album key={album.id} id={album.id} name={album.name} artists={album.artists} image={album.images[0]} />);
    artistItems = data.artists.map((artist) => <Artist key={artist.id} id={artist.id} name={artist.name} image={artist.images[0]} />);
  }

  let results;
  // let results = <Spinner />;

  if (data) {
    results = (
      <>
        <div className="container">
          <h2>My Albums</h2>
          {albumItems}
        </div>
        <div className="container">
          <h2>My Artists</h2>
          {artistItems}
        </div>
      </>
    );
  } else if (error) {
    results = (
      <div>
        An error has occurred...
        <button onClick={() => setError(false)}>Try again</button>
      </div>
    );
  } else {
    results = <Spinner />;
  }

  const classes = ['Results'];
  if (!data && !error) {
    classes.push('loading');
  }

  return (
    <div className="Account">
      <h1>My Account</h1>
      <div className={classes.join(' ')}>{results}</div>
    </div>
  );
};

export default Account;
