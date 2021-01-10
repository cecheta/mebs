import React from 'react';
import { Link } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { ReactComponent as StarFull } from '../../../../assets/images/star-full.svg';
import classes from './Artists.module.scss';

const Artists = ({ artists }) => {
  const artistsElements = artists.map((artist) => <Artist key={artist.id} id={artist.id} name={artist.name} image={artist.images[2]} />);

  return <div className={classes.Artists}>{artistsElements}</div>;
};

const Artist = ({ id, name, image }) => {
  const { favouriteArtists } = useSelector((state) => ({ favouriteArtists: state.favourites.artists }), shallowEqual);
  const favourite = favouriteArtists.includes(id);
  const star = favourite ? (
    <div className={classes.Star}>
      <StarFull fill="orange" className={classes.Star} />
    </div>
  ) : null;

  return (
    <Link to={`/artist/${id}`}>
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

const areEqual = (prevProps, nextProps) => {
  return prevProps.artists.length === nextProps.artists.length;
};

export default React.memo(Artists, areEqual);
