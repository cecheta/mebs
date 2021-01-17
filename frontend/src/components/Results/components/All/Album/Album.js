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
        <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
        {i !== arr.length - 1 ? comma : null}
      </span>
    );
  });

  return (
    <div className={classes.Album}>
      <Link to={`/album/${id}`}>
        {image ? <img className={classes.Album__Image} src={image.url} alt="" /> : null}
        <h4 className={classes.Album__Name}>{name}</h4>
      </Link>
      <h5 className={classes.Album__Artists}>{artistElements}</h5>
    </div>
  );
};

export default Album;
