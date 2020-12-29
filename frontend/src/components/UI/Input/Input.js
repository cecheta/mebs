import React from 'react';
import './Input.scss';

const Input = (props) => {
  return <input className="Input" type={props.type} name={props.name} value={props.value} onChange={props.onChange} />
};

export default Input;
