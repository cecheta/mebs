import React from 'react';
import { useDispatch } from 'react-redux';
import SongItem from './SongItem';
import AlbumItem from './AlbumItem';
import * as actions from '../../../store/actions';
import classes from './Artist.module.scss';

const Artist = ({ id, name, albums, image, songs }) => {
  const songsElements = songs.map((song) => <SongItem key={song.id} name={song.name} image={song.album.images[2]} album={song.album} />);
  const albumElements = albums.map((album) => <AlbumItem key={album.id} id={album.id} name={album.name} image={album.images[2]} />);

  const dispatch = useDispatch();
  const addArtist = (id) => dispatch(actions.addArtist(id));

  return (
    <div className={classes.Artist}>
      <div className={classes.Header}>
        {image ? <img className={classes.ArtistImage} src={image.url} alt="" /> : null}
        <div className={classes.Info}>
          <h2>{name}</h2>
          <h3 onClick={() => addArtist(id)}>Add</h3>
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
