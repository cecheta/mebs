import React, { useState } from 'react';
import Album from './Album';
import Artist from './Artist';
import Song from './Song';
import classes from './All.module.scss';

const All = ({ albums, artists, songs }) => {
  const [albumPosition, setAlbumPosition] = useState(0);

  const albumsElements = albums.map((album) => <Album key={album.id} id={album.id} name={album.name} artists={album.artists} image={album.images[1]} />);
  const artistsElements = artists.map((artists) => <Artist key={artists.id} id={artists.id} name={artists.name} image={artists.images[2]} />);
  const songsElements = songs.map((song) => <Song key={song.id} name={song.name} artists={song.artists} image={song.album.images[2]} album={song.album} />);

  const albumSlices = [];
  let count = 0;

  while (albums.length - count > 0) {
    const albumSlice = albumsElements.slice(count, count + 5);
    albumSlices.push(
      <div key={count} className={classes.Albums__Images} style={{ left: `-${albumPosition}00%` }}>
        {albumSlice}
      </div>
    );
    count += 5;
  }

  const toggleAlbums = (type) => {
    if (type === 'INC') {
      setAlbumPosition((old) => old + 1);
    } else if (type === 'DEC') {
      setAlbumPosition((old) => old - 1);
    }
  };

  return (
    <>
      <div className={classes.Albums}>
        <h2 className={classes.Albums__Title}>Albums</h2>
        <div className={classes.Albums__Container}>
          {albumPosition > 0 ? (
            <button className={`${classes.Albums__Button} ${classes['Albums__Button--Decrement']}`} style={{ outline: 'none' }} onClick={() => toggleAlbums('DEC')}>
              &#60;
            </button>
          ) : null}
          {albumSlices}
          {albumPosition * 5 + 5 < albums.length ? (
            <button className={`${classes.Albums__Button} ${classes['Albums__Button--Increment']}`} style={{ outline: 'none' }} onClick={() => toggleAlbums('INC')}>
              &#62;
            </button>
          ) : null}
        </div>
      </div>
      <h2>Artists</h2>
      <div className={classes.Artists}>{artistsElements}</div>
      <h2>Songs</h2>
      <div className={classes.Songs}>{songsElements}</div>
    </>
  );
};

export default All;
