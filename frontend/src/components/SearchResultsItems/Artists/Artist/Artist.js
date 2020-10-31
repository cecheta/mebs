import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import classes from './Artist.module.scss';
import { ReactComponent as StarFull } from '../../../../assets/images/star-full.svg';

const Artist = ({ id, name, image }) => {
  const { favouriteArtists } = useSelector((state) => ({ favouriteArtists: state.favourites.artists }), shallowEqual);
  const favourite = favouriteArtists.includes(id);
  const star = favourite ? (
    <div className={classes.Star}>
      <StarFull fill="orange" className={classes.Star} />
    </div>
  ) : null;

  return (
    <Link to={`/r/artist/${id}`}>
      <div className={classes.Artist}>
        {image ? <img src={image.url} alt="" /> : null}
        <div className={classes.Name}>
          <h3>{name}</h3>
          {star}
        </div>
      </div>
    </Link>
  );
};

export default Artist;
