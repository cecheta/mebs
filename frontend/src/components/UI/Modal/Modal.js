import React from 'react';
import Backdrop from '../Backdrop';
import './Modal.scss';

const Modal = (props) => {
  const classes = ['Modal'];
  if (props.size) {
    classes.push(props.size);
  }

  return (
    <>
      <Backdrop close={props.close} order={props.order} />
      <div className={classes.join(' ')} style={props.order ? { zIndex: props.order * 20 } : {}}>{props.children}</div>
    </>
  );
};

export default Modal;
