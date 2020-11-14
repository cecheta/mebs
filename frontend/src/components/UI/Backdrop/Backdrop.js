import React from 'react';
import './Backdrop.scss';

const Backdrop = (props) => {
  return <div className="Backdrop" onClick={props.close} style={props.order ? { zIndex: props.order * 10 } : {}}></div>;
};

export default Backdrop;
