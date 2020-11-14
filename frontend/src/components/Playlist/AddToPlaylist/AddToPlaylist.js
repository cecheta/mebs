import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as actions from '../../../store/actions';
import './AddToPlaylist.scss';

const AddToPlaylist = (props) => {
  const { playlists, song } = useSelector((state) => ({ playlists: state.playlists.playlists, song: state.playlists.song }), shallowEqual);

  const dispatch = useDispatch();

  const playlistElements = playlists.map((playlist) => (
    <li key={playlist.id} onClick={() => addSong(playlist.id)}>
      {playlist.name}
    </li>
  ));

  const addSong = (playlistId) => {
    const playlist = playlists.find((playlist) => playlist.id === playlistId);
    if (playlist.songs.find((playlistSong) => playlistSong.id === song.id)) {
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
