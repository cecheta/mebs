import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import axios from 'axios';
import * as actions from '../../../store/actions';
import './AddToPlaylist.scss';

const AddToPlaylist = (props) => {
  const [playlists, setPlaylists] = useState([]);

  const { song } = useSelector((state) => ({ song: state.playlists.song }), shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/playlists');
      console.log(response.data);
      setPlaylists(response.data);
    })();
  }, []);

  const playlistElements = playlists.map((playlist) => (
    <li key={playlist._id} onClick={() => addSong(playlist._id)}>
      {playlist.name}
    </li>
  ));

  const addSong = (playlistId) => {
    const playlist = playlists.find((playlist) => playlist._id === playlistId);
    if (playlist.songs.find((playlistSong) => playlistSong === song)) {
      alert('Song is already in playlist!');
    } else {
      dispatch(actions.playlistAddSong(playlistId));
    }
  };

  return (
    <div className="AddToPlaylist">
      <h2>ADD TO PLAYLIST</h2>
      <h3>Choose playlist</h3>
      <ul>
        {playlistElements}
        <li onClick={props.addNewPlaylist}>New playlist</li>
      </ul>
    </div>
  );
};

export default AddToPlaylist;
