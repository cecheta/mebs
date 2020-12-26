import React, { useEffect } from 'react';
import HomeSearch from '../../components/HomeSearch';
import Bubble from '../../components/UI/Bubble';

const Home = () => {
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

  return (
    <>
      <HomeSearch />
      {bubbles}
    </>
  );
};

export default Home;
