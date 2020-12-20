import React, { useEffect, useRef, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Album from './components/Album';
import Artist from './components/Artist';
import Spinner from '../../components/UI/Spinner';
import { ReactComponent as Delete } from '../../assets/images/cross.svg';
import './Account.scss';

const Account = () => {
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  const requestRef = useRef({
    source: axios.CancelToken.source(),
  });

  const { token } = useSelector(
    (state) => ({
      token: state.auth.token,
    }),
    shallowEqual
  );

  useEffect(() => {
    (async () => {
      if (!data && !error) {
        try {
          const response = await axios.get(`/api/account`, {
            cancelToken: requestRef.current.source.token,
          });
          setData(response.data);
          setPlaylists(response.data.playlists);
        } catch (error) {
          if (!axios.isCancel(error)) {
            setError(true);
          }
        }
      }
    })();
  }, [data, error]);

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

  const deletePlaylist = async (id) => {
    await axios.delete(`/api/playlists/${id}`);
    setPlaylists((playlists) => {
      const updatedPlaylists = playlists.filter((filter) => filter._id !== id);
      return updatedPlaylists;
    });
  };

  let albumItems, artistItems;
  if (data) {
    albumItems = data.albums.map((album) => <Album key={album.id} id={album.id} name={album.name} artists={album.artists} image={album.images[0]} />);
    artistItems = data.artists.map((artist) => <Artist key={artist.id} id={artist.id} name={artist.name} image={artist.images[0]} />);
  }

  const playlistItems = playlists.map((playlist) => (
    <li key={playlist._id}>
      <Link to={`/account/playlist/${playlist._id}`}>{playlist.name}</Link>
      <Delete fill="red" onClick={() => deletePlaylist(playlist._id)} />
    </li>
  ));

  let results;

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
          <h2>My Playlists</h2>
          <ul className="playlists">{playlistItems}</ul>
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

  if (!token) {
    results = <Redirect to="/login" />;
  }

  return (
    <div className="Account">
      <h1>My Account</h1>
      <div className={classes.join(' ')}>{results}</div>
    </div>
  );
};

export default Account;
