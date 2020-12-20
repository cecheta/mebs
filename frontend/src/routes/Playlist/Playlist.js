import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner';
import Song from './components/Song';
import './Playlist.scss';

const Playlist = (props) => {
  const [error, setError] = useState(false);
  const [playlist, setPlaylist] = useState(null);

  const { token } = useSelector((state) => ({ token: state.auth.token }), shallowEqual);

  const requestRef = useRef({
    source: axios.CancelToken.source(),
  });

  const id = props.match.params.id;

  useEffect(() => {
    (async () => {
      if (token && !playlist && !error) {
        try {
          const response = await axios.get(`/api/playlists/${id}`, {
            cancelToken: requestRef.current.source.token,
          });
          setPlaylist(response.data);
        } catch (error) {
          if (!axios.isCancel(error)) {
            setError(true);
          }
        }
      }
    })();
  }, [token, playlist, id, error]);

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

  const updateState = (id) => {
    setPlaylist((playlist) => {
      const updatedPlaylist = { ...playlist };
      updatedPlaylist.songs = updatedPlaylist.songs.filter((song) => song.id !== id);
      return updatedPlaylist;
    });
  };

  let songItems;
  let results;

  if (playlist) {
    const songs = playlist.songs;
    songItems = songs.map((song) => <Song key={song.id} id={song.id} playlistId={id} name={song.name} artists={song.artists} image={song.album.images[2]} album={song.album} remove={() => updateState(song.id)} />);
    results = songItems;
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

  const allClasses = ['Songs'];
  if (!playlist && !error) {
    allClasses.push('loading');
  }

  if (!token) {
    results = <Redirect to="/login" />;
  }

  return (
    <div className={'Playlist'}>
      <h1>{playlist?.name}</h1>
      <div className={allClasses.join(' ')}>{results}</div>
    </div>
  );
};

export default Playlist;
