import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import axios from 'axios';
import Album from '../../components/Pages/Album/Album';
import Artist from '../../components/Pages/Artist/Artist';
import AddToPlaylist from '../../components/AddToPlaylist';
import NewPlaylist from '../../components/NewPlaylist';
import Spinner from '../../components/UI/Spinner';
import Back from '../../components/UI/Back';
import Modal from '../../components/UI/Modal';
import * as actions from '../../store/actions';
import './Result.scss';

const Result = (props) => {
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  const [newPlaylist, setNewPlaylist] = useState(false);

  const dispatch = useDispatch();

  const { song } = useSelector((state) => ({ song: state.playlists.song }), shallowEqual);

  const requestRef = useRef({
    source: axios.CancelToken.source(),
  });

  const id = props.match.params.id;
  const type = props.match.params.type;

  useEffect(() => {
    (async () => {
      if (!error && !data[type]) {
        try {
          const response = await axios.get(`/api/${type}s/${id}`, {
            cancelToken: requestRef.current.source.token,
          });
          setData({ [type]: response.data });
        } catch (error) {
          if (!axios.isCancel(error)) {
            setError(true);
          }
        }
      }
    })();
  }, [data, error, id, type]);

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
  if (data[type]) {
    if (type === 'album') {
      results = <Album id={data.album.id} name={data.album.name} artists={data.album.artists} image={data.album.images[0]} songs={data.album.tracks} />;
    } else if (type === 'artist') {
      results = <Artist id={data.artist.id} name={data.artist.name} albums={data.artist.albums} image={data.artist.images[0]} songs={data.artist.tracks} />;
    }
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

  const classes = ['Result'];
  if (!data[type] && !error) {
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
    const response = await axios.post('/api/playlists/new', payload);
    return response.data;
  };

  const submitNewPlaylist = async (e, name) => {
    e.preventDefault();
    try {
      const data = await createNewPlaylist(name);
      dispatch(actions.playlistAddSong(data._id));
    } catch (err) {
      console.log(err);
    } finally {
      setNewPlaylist(false);
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

export default Result;
