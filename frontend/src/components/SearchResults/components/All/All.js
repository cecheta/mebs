import React from 'react';
import Album from './Album';
import Artist from './Artist';
import Song from './Song';
import classes from './All.module.scss';

const All = ({ albums, artists, songs }) => {
  const albumsElements = albums.map((album) => <Album key={album.id} id={album.id} name={album.name} artists={album.artists} image={album.images[1]} />);
  const artistsElements = artists.map((artists) => <Artist key={artists.id} id={artists.id} name={artists.name} image={artists.images[2]} />);
  const songsElements = songs.map((song) => <Song key={song.id} name={song.name} artists={song.artists} image={song.album.images[2]} album={song.album} />);

  return (
    <>
      <h3>Albums</h3>
      <div className={classes.Albums}>{albumsElements}</div>
      <h3>Artists</h3>
      <div className={classes.Artists}>{artistsElements}</div>
      <h3>Songs</h3>
      <div className={classes.Songs}>{songsElements}</div>
    </>
  );
};

export default All;
