import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Album from './components/Album';
import AddToPlaylist from '../../components/AddToPlaylist';
import NewPlaylist from '../../components/NewPlaylist';
import Spinner from '../../components/UI/Spinner';
import Back from '../../components/UI/Back';
import Modal from '../../components/UI/Modal';
import * as actions from '../../store/actions';
import './AlbumPage.scss';

const AlbumPage = (props) => {
  const [album, setAlbum] = useState(null);
  const [newPlaylist, setNewPlaylist] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const song = useSelector((state) => state.playlists.song);
  const playlists = useSelector((state) => state.playlists.playlists);

  const requestRef = useRef({
    source: axios.CancelToken.source(),
  });

  const id = props.match.params.id;

  useEffect(() => {
    (async () => {
      if (!error && !album) {
        try {
          const response = await axios.get(`/api/albums/${id}`, {
            cancelToken: requestRef.current.source.token,
          });
          setAlbum(response.data);
        } catch (error) {
          if (!axios.isCancel(error)) {
            setError(true);
          }
        }
      }
    })();
  }, [error, id, album]);

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

  let results;
  if (album) {
    results = <Album id={album.id} name={album.name} artists={album.artists} image={album.images[0]} songs={album.tracks} />;
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

  const classes = ['AlbumPage'];
  if (!album && !error) {
    classes.push('loading');
  }

  const cancelPlaylist = () => {
    dispatch(actions.playlistEnd());
  };

  const addNewPlaylist = () => {
    setNewPlaylist(true);
  };

  const cancelNewPlaylist = () => {
    setNewPlaylist(false);
  };

  const createNewPlaylist = async (name) => {
    const payload = { name };
    const playlistNames = playlists.map((playlist) => playlist.name);
    if (playlistNames.includes(name)) {
      alert(`Playlist called ${name} already exists`);
    } else {
      const response = await axios.post('/api/playlists/new', payload);
      return response.data;
    }
  };

  const submitNewPlaylist = async (e, name) => {
    e.preventDefault();
    try {
      const data = await createNewPlaylist(name);
      if (data) {
        dispatch(actions.playlistAddSong(data._id));
        setNewPlaylist(false);
      }
    } catch (err) {
      if (err.response.status === 400) {
        alert(`Playlist called ${name} already exists`);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className={classes.join(' ')}>
        <Back />
        {results}
      </div>
      {song ? (
        <Modal close={cancelPlaylist}>
          <AddToPlaylist addNewPlaylist={addNewPlaylist} />
        </Modal>
      ) : null}
      {song && newPlaylist ? (
        <Modal close={cancelNewPlaylist} order={2} size="small">
          <NewPlaylist submit={submitNewPlaylist} />
        </Modal>
      ) : null}
    </>
  );
};

export default AlbumPage;
