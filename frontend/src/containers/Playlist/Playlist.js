import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import SongItem from '../../components/Playlist/SongItem/SongItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Playlist.scss';

const Playlist = (props) => {
  // TODO: Redirect if not logged in
  const [error, setError] = useState(false);
  const [playlist, setPlaylist] = useState(null);

  const requestRef = useRef({
    source: axios.CancelToken.source(),
  });

  const id = props.match.params.id;

  useEffect(() => {
    (async () => {
      if (!playlist && !error) {
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
  }, [playlist, id, error]);

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

  let songItems;
  if (playlist) {
    const songs = playlist.songs;
    songItems = songs.map((song) => <SongItem key={song.id} id={song.id} playlistId={id} name={song.name} artists={song.artists} image={song.album.images[2]} album={song.album} />);
  }

  // if (data && data.length !== playlist.songs.length) {
  //   setData((oldData) => {
  //     const songs = [...oldData];
  //     return songs.filter((song) => {
  //       const id = song.id;
  //       return playlist.songs.findIndex((song) => song.id === id) > -1;
  //     });
  //   });
  // }

  let results;

  if (playlist) {
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

  const classes = ['Songs'];
  if (!playlist && !error) {
    classes.push('loading');
  }

  return (
    <div className="Playlist">
      <h1>{playlist?.name}</h1>
      <div className={classes.join(' ')}>{results}</div>
    </div>
  );
};

export default Playlist;
