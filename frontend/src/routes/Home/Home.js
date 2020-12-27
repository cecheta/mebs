import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeSearch from '../../components/HomeSearch';
import Background from '../../components/Background';

const Home = () => {
  const [suggestions, setSuggestions] = useState([]);

  //TODO: Refactor into hook
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/charts');
      const data = [...response.data.artists, ...response.data.albums, ...response.data.songs];
      const filteredSuggestions = [...new Set(data)].filter((el) => el.length <= 15);
      shuffleArray(filteredSuggestions);

      setSuggestions(filteredSuggestions);
    })();
  }, []);

  return (
    <>
      <Background />
      <HomeSearch suggestions={suggestions} />
    </>
  );
};

export default Home;
