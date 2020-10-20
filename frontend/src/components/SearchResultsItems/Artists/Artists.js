import React from 'react';
import Artist from './Artist/Artist';
import classes from './Artists.module.scss';

const Artists = ({ artists }) => {
  const artistsElements = artists.map((artist) => <Artist key={artist.id} id={artist.id} name={artist.name} image={artist.images[2]} />);

  return <div className={classes.Artists}>{artistsElements}</div>;
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.artists.length === nextProps.artists.length;
}

export default React.memo(Artists, areEqual);
