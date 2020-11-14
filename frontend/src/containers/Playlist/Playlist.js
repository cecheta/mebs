import React, { useEffect, useRef, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import axios from 'axios';
import SongItem from '../../components/Playlist/SongItem/SongItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Playlist.scss';

const Playlist = (props) => {
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const requestRef = useRef({
    source: axios.CancelToken.source(),
  });

  const { playlists, loaded } = useSelector((state) => ({ playlists: state.playlists.playlists, loaded: state.playlists.loaded }), shallowEqual);

  const id = props.match.params.id;
  const playlist = playlists.find((playlist) => playlist.id === id);

  const songIds = playlist?.songs.map((song) => song.id);

  useEffect(() => {
    (async () => {
      if (loaded && !data && !error) {
        try {
          const response = await axios.get(`/api/songs?ids=${songIds.join(',')}`, {
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
  }, [loaded, data, error, songIds]);

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
  if (data) {
    // const songs = [...data];
    // console.log(songs);
    // songs.filter((song) => {
    // return playlist.songs.findIndex((playlistSong) => playlistSong.id === song.id) > -1;
    // });
    // songItems = songs.map((song) => <SongItem key={song.id} id={song.id} playlistId={id} name={song.name} artists={song.artists} image={song.album.images[2]} album={song.album} />);
    songItems = data.map((song) => <SongItem key={song.id} id={song.id} playlistId={id} name={song.name} artists={song.artists} image={song.album.images[2]} album={song.album} />);
  }

  if (data && data.length !== playlist.songs.length) {
    setData((oldData) => {
      const songs = [...oldData];
      return songs.filter((song) => {
        const id = song.id;
        return playlist.songs.findIndex((song) => song.id === id) > -1;
      });
    });
  }

  let results;

  if (data) {
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
  if (!data && !error) {
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
