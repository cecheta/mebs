import React, { useEffect, useRef, useState } from 'react';
import './Bubble.scss';

const Bubble = () => {
  const [loop, setLoop] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const bubble = ref.current;

    const size = Math.random() * 8 + 5;
    const left = Math.random() * (100 - size);

    bubble.style.width = `${size}vw`;
    bubble.style.height = `${size}vw`;
    bubble.style.left = `${left}vw`;

    const speed = Math.random() / 5 + 0.1;
    const delay = Math.random() * 10 * 1000;

    
    let interval;
    let timeout = setTimeout(() => {
      interval = setInterval(() => {
        const top = bubble.getBoundingClientRect().top;
        const width = bubble.getBoundingClientRect().width;
        bubble.style.top = `${top - speed}px`;

        if (+(top - speed) + width < 0) {
          bubble.style.removeProperty('top');
          setLoop((loop) => loop + 1);
        }
      }, 1);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [loop]);

  return <div className="Bubble" ref={ref} />;
};

export default Bubble;
