import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { ReactComponent as StarFull } from '../../../../assets/images/star-full.svg';
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

  const { favouriteAlbums } = useSelector((state) => ({ favouriteAlbums: state.favourites.albums }), shallowEqual);
  const favourite = favouriteAlbums.includes(id);
  const star = favourite ? (
    <div className={classes.Star}>
      <StarFull fill="orange" className={classes.Star} />
    </div>
  ) : null;

  return (
    <div className={classes.Album}>
      <Link to={`/r/album/${id}`}>{image ? <img src={image.url} alt="" /> : null}</Link>
      <div className={classes.Info}>
        <div>
          <h3>
            <Link to={`/r/album/${id}`}>{name}</Link>
          </h3>
          <h4>{artistElements}</h4>
        </div>
        {star}
      </div>
    </div>
  );
};

export default Album;
