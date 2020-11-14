import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as actions from '../../../store/actions';
import './AddToPlaylist.scss';

const AddToPlaylist = (props) => {
  const { playlists } = useSelector((state) => ({ playlists: state.playlists.playlists }), shallowEqual);

  const dispatch = useDispatch();

  const playlistElements = playlists.map((playlist) => (
    <li key={playlist.id} onClick={() => addSong(playlist.id)}>
      {playlist.name}
    </li>
  ));

  const addSong = (playlistId) => {
    dispatch(actions.playlistAddSong(playlistId));
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
