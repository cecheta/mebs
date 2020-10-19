import React from 'react';
import { Link } from 'react-router-dom';
import Album from './Album/Album';
import Artist from './Artist/Artist';
import Song from './Song/Song';
import classes from './AllItems.module.scss';

const AllItems = ({ data }) => {
  const albumsArray = data.albums.items;
  const artistsArray = data.artists.items;
  const songsArray = data.tracks.items;

  const albums = albumsArray.map((album) => (
    <Link key={album.id} to={`/r/album/${album.id}`}>
      <Album data={album} />
    </Link>
  ));
  const artists = artistsArray.map((artists) => <Artist key={artists.id} data={artists} />);
  const songs = songsArray.map((song) => <Song key={song.id} data={song} />);

  return (
    <>
      <h3>Albums</h3>
      <div className={classes.Albums}>{albums}</div>
      <h3>Artists</h3>
      <div className={classes.Artists}>{artists}</div>
      <h3>Songs</h3>
      <div className={classes.Songs}>{songs}</div>
    </>
  );
};

export default AllItems;
