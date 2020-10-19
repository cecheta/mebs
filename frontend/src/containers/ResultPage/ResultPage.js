import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Album from '../../components/Pages/Album/Album';
import Spinner from '../../components/UI/Spinner/Spinner';
import './ResultPage.scss';

const ResultPage = (props) => {
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  let loadingRef = useRef(true);
  const requestRef = useRef({
    source: axios.CancelToken.source(),
  });

  const id = props.match.params.id;
  const type = props.match.params.type;

  useEffect(() => {
    (async () => {
      if (!error && !data) {
        try {
          const response = await axios.get(`/api/${type}/${id}`, {
            cancelToken: requestRef.current.source.token,
          });
          loadingRef.current = false;
          setData(response.data);
        } catch (error) {
          if (!axios.isCancel(error)) {
            setError(true);
            loadingRef.current = false;
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
  if (data) {
    if (type === 'album') {
      results = <Album data={data} />;
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
  if (loadingRef.current) {
    classes.push('loading');
  }

  return <div className={classes.join(' ')}>{results}</div>;
};

export default ResultPage;
