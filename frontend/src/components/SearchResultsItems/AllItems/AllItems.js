import React from 'react';
import { Link } from 'react-router-dom';
import Album from './Album/Album';
import Artist from './Artist/Artist';
import Song from './Song/Song';
import classes from './AllItems.module.scss';

const AllItems = ({ albums, artists, songs }) => {

  const albumsElements = albums.map((album) => (
    <Link key={album.id} to={`/r/album/${album.id}`}>
      <Album name={album.name} artists={album.artists} image={album.images[1]} />
    </Link>
  ));
  const artistsElements = artists.map((artists) => <Artist key={artists.id} name={artists.name} image={artists.images[2]} />);
  const songsElements = songs.map((song) => <Song key={song.id} name={song.name} artists={song.artists} image={song.album.images[2]} />);

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

export default AllItems;
