import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import './AddToPlaylist.scss';

const AddToPlaylist = (props) => {
  const song = useSelector((state) => state.playlists.song);
  const playlists = useSelector((state) => state.playlists.playlists);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.playlistFetch());
  }, [dispatch]);

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
