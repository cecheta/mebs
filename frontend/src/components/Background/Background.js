import React, { useEffect } from 'react';
import Bubble from './components/Bubble';

const Background = () => {
  let number = Math.round(Math.random() * 3 + 2);

  const bubbles = [];
  while (number) {
    bubbles.push(<Bubble key={number--} />);
  }

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';

    return () => {
      body.style.removeProperty('overflow');
    };
  }, []);

  return <>{bubbles}</>;
};

export default Background;
