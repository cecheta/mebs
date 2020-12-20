import React from 'react';
import { Link } from 'react-router-dom';
import classes from './All.module.scss';

const All = ({ albums, artists, songs }) => {
  const albumsElements = albums.map((album) => <Album key={album.id} id={album.id} name={album.name} artists={album.artists} image={album.images[1]} />);
  const artistsElements = artists.map((artists) => <Artist key={artists.id} id={artists.id} name={artists.name} image={artists.images[2]} />);
  const songsElements = songs.map((song) => <Song key={song.id} name={song.name} artists={song.artists} image={song.album.images[2]} album={song.album} />);

  return (
    <>
      <h3>Albums</h3>
      <div className={classes.Albums}>{albumsElements}</div>
      <h3>Artists</h3>
      <div className={classes.Artists}>{artistsElements}</div>
      <h3>Songs</h3>
      <div className={classes.Songs}>{songsElements}</div>
    </>
  );
};

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
      <Link to={`/r/album/${id}`}>
        {image ? <img src={image.url} alt="" /> : null}
        <h4>{name}</h4>
      </Link>
      <h5>{artistElements}</h5>
    </div>
  );
};

const Artist = ({ id, name, image }) => {
  return (
    <Link to={`/r/artist/${id}`}>
      <div className={classes.Artist}>
        {image ? <img src={image.url} alt="" /> : null}
        <h4>{name}</h4>
      </div>
    </Link>
  );
};

const Song = ({ name, artists, image, album }) => {
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
    <div className={classes.Song}>
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

export default All;
