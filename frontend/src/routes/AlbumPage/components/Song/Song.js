import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../../../store/actions';
import { ReactComponent as Add } from '../../../../assets/images/plus.svg';
import classes from './Song.module.scss';

const Song = ({ id, name, number, songArtists, albumArtists }) => {
  const dispatch = useDispatch();

  const artists = songArtists.map((artist) => ({
    name: artist.name,
    id: artist.id,
  }));
  let filteredArtists = artists.filter((artist) => {
    const artistNames = albumArtists.map((artist) => artist.name);
    return !artistNames.includes(artist.name);
  });
  filteredArtists = filteredArtists.map((artist, i, arr) => {
    let text = artist.name;
    if (i !== arr.length - 1) {
      text += ',';
    }
    if (i === 0) {
      return (
        <span className={classes.artists} key={artist.id}>
          &nbsp;- <Link to={`/r/artist/${artist.id}`}>{text}</Link>
        </span>
      );
    }
    return (
      <span className={classes.artists} key={artist.id}>
        &nbsp;<Link to={`/r/artist/${artist.id}`}>{text}</Link>
      </span>
    );
  });

  const addToPlaylist = () => {
    dispatch(actions.playlistStart(id));
  };

  return (
    <div className={classes.Song}>
      <h4>
        <span className={classes.number}>{number}.</span>
        {name}
        {filteredArtists}
      </h4>
      <div className={classes.Add}>
        <Add fill="green" onClick={addToPlaylist} />
      </div>
    </div>
  );
};

export default Song;
