import React from 'react';
import { withRouter } from 'react-router-dom';
import './Back.scss';

const Back = (props) => {
  return (
    <div className="Back" onClick={() => props.history.goBack()}>
      &larr;
    </div>
  );
};

export default withRouter(Back);
