import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Album.module.scss';

const Album = ({ id, name, artists, image }) => {
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

  return (
    <div className={classes.Album}>
      <Link to={`/r/album/${id}`}>{image ? <img src={image.url} alt="" /> : null}</Link>
      <div className={classes.Info}>
        <Link to={`/r/album/${id}`}>
          <h4>{name}</h4>
        </Link>
        <h5>{artistElements}</h5>
      </div>
    </div>
  );
};

export default Album;
