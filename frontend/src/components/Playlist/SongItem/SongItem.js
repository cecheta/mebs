import React from 'react';
import { Link } from 'react-router-dom';
import classes from './SongItem.module.scss';

const SongItem = ({ name, artists, image, album }) => {
  const songArtists = artists.map((artist) => ({
    name: artist.name,
    id: artist.id,
  }));
  const artistsElements = songArtists.map((artist, i, arr) => {
    const comma = <span>,&nbsp;</span>;
    return (
      <span key={artist.id}>
        <Link to={`/r/artist/${artist.id}`}>{artist.name}</Link>
        {i !== arr.length - 1 ? comma : null}
      </span>
    );
  });

  return (
    <div className={classes.SongItem}>
      <Link to={`/r/album/${album.id}`}>{image ? <img src={image.url} alt="" /> : null}</Link>
      <div className="info">
        <h4>
          <Link to={`/r/album/${album.id}`}>{name}</Link>
        </h4>
        <h5>{artistsElements}</h5>
      </div>
    </div>
  );
};

export default SongItem;
