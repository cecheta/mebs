import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Album from '../../components/Pages/Album/Album';
import Artist from '../../components/Pages/Artist/Artist';
import Spinner from '../../components/UI/Spinner/Spinner';
import './ResultPage.scss';

const ResultPage = (props) => {
  const [error, setError] = useState(false);
  const [data, setData] = useState({});

  const requestRef = useRef({
    source: axios.CancelToken.source(),
  });

  const id = props.match.params.id;
  const type = props.match.params.type;

  useEffect(() => {
    (async () => {
      if (!error && !data[type]) {
        try {
          const response = await axios.get(`/api/${type}/${id}`, {
            cancelToken: requestRef.current.source.token,
          });
          setData({ [type]: response.data });
        } catch (error) {
          if (!axios.isCancel(error)) {
            setError(true);
          }
        }
      }
    })();
  }, [data, error, id, type]);

  useEffect(() => {
    return () => {
      if (error) {
        setError(false);
      }
    };
  }, [error]);

  let results;
  if (data[type]) {
    if (type === 'album') {
      results = <Album name={data.album.name} artists={data.album.artists} image={data.album.images[0]} songs={data.album.tracks} />;
    } else if (type === 'artist') {
      results = <Artist name={data.artist.name} albums={data.artist.albums} image={data.artist.images[0]} songs={data.artist.tracks} />;
    }
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

  const classes = ['ResultPage'];
  if (!data[type] && !error) {
    classes.push('loading');
  }

  return <div className={classes.join(' ')}>{results}</div>;
};

export default ResultPage;
