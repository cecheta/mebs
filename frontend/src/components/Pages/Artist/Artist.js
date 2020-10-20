import React from 'react';
import SongItem from './SongItem';
import AlbumItem from './AlbumItem';
import classes from './Artist.module.scss';

const Artist = ({ name, albums, image, songs }) => {
  const songsElements = songs.map((song) => <SongItem key={song.id} name={song.name} image={song.album.images[2]} album={song.album} />);
  const albumElements = albums.map((album) => <AlbumItem key={album.id} id={album.id} name={album.name} image={album.images[2]} />);

  return (
    <div className={classes.Artist}>
      <div className={classes.Header}>
        {image ? <img className={classes.ArtistImage} src={image.url} alt="" /> : null}
        <div className={classes.Info}>
          <h2>{name}</h2>
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
