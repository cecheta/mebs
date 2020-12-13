import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ReactComponent as Delete } from '../../../assets/images/cross.svg';
import classes from './SongItem.module.scss';

const SongItem = ({ id, playlistId, name, artists, image, album, remove }) => {
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

  const deleteSong = async () => {
    const payload = { id };
    axios.patch(`/api/playlists/${playlistId}`, payload);
    remove();
  };

  return (
    <div className={classes.SongItem}>
      <div className={classes.Container}>
        <Link to={`/r/album/${album.id}`}>{image ? <img src={image.url} alt="" /> : null}</Link>
        <div className="info">
          <h4>
            <Link to={`/r/album/${album.id}`}>{name}</Link>
          </h4>
          <h5>{artistsElements}</h5>
        </div>
      </div>
      <Delete fill="red" onClick={deleteSong} />
    </div>
  );
};

export default SongItem;
