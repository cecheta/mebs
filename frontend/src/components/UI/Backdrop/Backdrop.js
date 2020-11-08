import React from 'react';
import './Backdrop.scss';

const Backdrop = (props) => {
  return <div className="Backdrop" onClick={props.close}></div>;
};

export default Backdrop;
