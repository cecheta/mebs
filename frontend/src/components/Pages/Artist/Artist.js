import React from 'react';
import { connect } from 'react-redux';
import SongItem from './SongItem';
import AlbumItem from './AlbumItem';
import * as actions from '../../../store/actions';
import classes from './Artist.module.scss';

const Artist = (props) => {
  const songsElements = props.songs.map((song) => <SongItem key={song.id} name={song.name} image={song.album.images[2]} album={song.album} />);
  const albumElements = props.albums.map((album) => <AlbumItem key={album.id} id={album.id} name={album.name} image={album.images[2]} />);

  return (
    <div className={classes.Artist}>
      <div className={classes.Header}>
        {props.image ? <img className={classes.ArtistImage} src={props.image.url} alt="" /> : null}
        <div className={classes.Info}>
          <h2>{props.name}</h2>
          <h3 onClick={() => props.addArtist(props.id)}>Add</h3>
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

const mapDispatchToProps = (dispatch) => {
  return {
    addArtist: (id) => dispatch(actions.addArtist(id)),
  };
};

export default connect(null, mapDispatchToProps)(Artist);
