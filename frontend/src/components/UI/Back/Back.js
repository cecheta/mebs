import React from 'react';
import { useHistory } from 'react-router-dom';
import './Back.scss';

const Back = () => {
  const history = useHistory();

  return (
    <div className="Back" onClick={() => history.goBack()}>
      &larr;
    </div>
  );
};

export default Back;
