import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import axios from 'axios';
import SongItem from './SongItem';
import AlbumItem from './AlbumItem';
import * as actions from '../../../store/actions';
import { ReactComponent as StarEmpty } from '../../../assets/images/star-empty.svg';
import { ReactComponent as StarFull } from '../../../assets/images/star-full.svg';
import classes from './Artist.module.scss';

const Artist = ({ id, name, albums, image, songs }) => {
  const songsElements = songs.map((song) => <SongItem key={song.id} name={song.name} image={song.album.images[2]} album={song.album} />);
  const albumElements = albums.map((album) => <AlbumItem key={album.id} id={album.id} name={album.name} image={album.images[2]} />);

  const dispatch = useDispatch();
  
  const addArtist = async (id) => {
    try {
      const payload = {
        id,
      };
      await axios.post('/favourites/artist', payload);
      dispatch(actions.addArtist(id));
    } catch (e) {
      console.log(e);
    }
  };
  const removeArtist = async (id) => {
    try {
      await axios.delete(`/favourites/artist/${id}`);
      dispatch(actions.removeArtist(id));
    } catch (e) {
      console.log(e);
    }
  };

  const { favouriteArtists } = useSelector((state) => ({ favouriteArtists: state.favourites.artists }), shallowEqual);

  const favourite = favouriteArtists.includes(id);

  const handleToggleFavourite = (id) => {
    !favourite ? addArtist(id) : removeArtist(id);
  };

  const star = favourite ? <StarFull fill="orange" onClick={() => handleToggleFavourite(id)} /> : <StarEmpty onClick={() => handleToggleFavourite(id)} />;

  return (
    <div className={classes.Artist}>
      <div className={classes.Header}>
        {image ? <img className={classes.ArtistImage} src={image.url} alt="" /> : null}
        <div className={classes.Info}>
          <h2>{name}</h2>
          <div className={classes.Star}>{star}</div>
        </div>
      </div>
      <div className={classes.Songs}>
        <h3>Top Songs</h3>
        {songsElements}
      </div>
      <div className={classes.Albums}>
        <h3>Albums</h3>
        {albumElements}
      </div>
    </div>
  );
};

export default Artist;
