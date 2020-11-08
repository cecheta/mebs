import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.scss';

const Modal = (props) => {
  return (
    <>
      <Backdrop close={props.close} />
      <div className="Modal">{props.children}</div>
    </>
  );
};

export default Modal;
