import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Artist from './components/Artist';
import Spinner from '../../components/UI/Spinner';
import Back from '../../components/UI/Back';
import './ArtistPage.scss';

const ArtistPage = (props) => {
  const [artist, setArtist] = useState(null);
  const [error, setError] = useState(false);

  const requestRef = useRef({
    source: axios.CancelToken.source(),
  });

  const id = props.match.params.id;

  useEffect(() => {
    (async () => {
      if (!error && !artist) {
        try {
          const response = await axios.get(`/api/artists/${id}`, {
            cancelToken: requestRef.current.source.token,
          });
          setArtist(response.data);
        } catch (error) {
          if (!axios.isCancel(error)) {
            setError(true);
          }
        }
      }
    })();
  }, [error, id, artist]);

  useEffect(() => {
    return () => {
      if (error) {
        setError(false);
      }
    };
  }, [error]);

  useEffect(() => {
    const source = requestRef.current.source;
    return () => {
      source.cancel();
    };
  }, []);

  let results;
  if (artist) {
    results = <Artist id={artist.id} name={artist.name} albums={artist.albums} image={artist.images[0]} songs={artist.tracks} />;
  } else if (error) {
    results = (
      <div>
        An error has occurred...
        <button onClick={() => setError(false)}>Try again</button>
      </div>
    );
  } else {
    results = <Spinner />;
  }

  const classes = ['ArtistPage'];
  if (!artist && !error) {
    classes.push('loading');
  }

  return (
    <div className={classes.join(' ')}>
      <Back />
      {results}
    </div>
  );
};

export default ArtistPage;
