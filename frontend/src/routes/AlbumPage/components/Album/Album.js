import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import axios from 'axios';
import Song from '../Song';
import * as actions from '../../../../store/actions';
import { ReactComponent as StarEmpty } from '../../../../assets/images/star-empty.svg';
import { ReactComponent as StarFull } from '../../../../assets/images/star-full.svg';
import classes from './Album.module.scss';

const Album = ({ id, artists, name, image, songs }) => {
  const albumArtists = artists.map((artist) => ({
    name: artist.name,
    id: artist.id,
  }));
  const artistElements = albumArtists.map((artist, i, arr) => {
    const comma = <span>,&nbsp;</span>;
    return (
      <span key={artist.id}>
        <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
        {i !== arr.length - 1 ? comma : null}
      </span>
    );
  });
  const albumSongs = songs.items.map((song) => <Song key={song.id} id={song.id} songArtists={song.artists} albumArtists={albumArtists} number={song.track_number} name={song.name} />);

  const dispatch = useDispatch();

  const addAlbum = async (id) => {
    try {
      const payload = {
        id,
      };
      await axios.post('/api/favourites/album', payload);
      dispatch(actions.addAlbum(id));
    } catch (e) {
      if (e.response.status === 409) {
        dispatch(actions.addAlbum(id));
      } else {
        console.log(e);
      }
    }
  };
  const removeAlbum = async (id) => {
    try {
      await axios.delete(`/api/favourites/album/${id}`);
      dispatch(actions.removeAlbum(id));
    } catch (e) {
      if (e.response.status === 409) {
        dispatch(actions.removeAlbum(id));
      } else {
        console.log(e);
      }
    }
  };

  const { favouriteAlbums } = useSelector((state) => ({ favouriteAlbums: state.favourites.albums }), shallowEqual);

  const favourite = favouriteAlbums.includes(id);

  const handleToggleFavourite = (id) => {
    !favourite ? addAlbum(id) : removeAlbum(id);
  };

  const star = favourite ? <StarFull fill="orange" onClick={() => handleToggleFavourite(id)} /> : <StarEmpty onClick={() => handleToggleFavourite(id)} />;

  return (
    <div className={classes.Album}>
      <div className={classes.Header}>
        {image ? <img src={image.url} alt="" /> : null}
        <div className={classes.Info}>
          <div className={classes.InfoAlbum}>
            <h2>{name}</h2>
            <h3>{artistElements}</h3>
          </div>
          <div className={classes.Star}>{star}</div>
        </div>
      </div>
      {albumSongs}
    </div>
  );
};

export default Album;
