import React from 'react';
import { Link } from 'react-router-dom';
import SongItem from './SongItem';
import classes from './Album.module.scss';

const Album = ({ artists, name, image, songs }) => {
  const albumArtists = artists.map((artist) => ({
    name: artist.name,
    id: artist.id,
  }));
  const artistElements = albumArtists.map((artist, i, arr) => {
    const comma = <span>,&nbsp;</span>;
    return (
      <span key={artist.id}>
        <Link to={`/r/artist/${artist.id}`}>{artist.name}</Link>
        {i !== arr.length - 1 ? comma : null}
      </span>
    );
  });
  const albumSongs = songs.items.map((song) => <SongItem key={song.id} songArtists={song.artists} albumArtists={albumArtists} number={song.track_number} name={song.name} />);

  return (
    <div className={classes.Album}>
      <div className={classes.Header}>
        {image ? <img src={image.url} alt="" /> : null}
        <div className={classes.Info}>
          <h2>{name}</h2>
          <h3>{artistElements}</h3>
        </div>
      </div>
      {albumSongs}
    </div>
  );
};

export default Album;
