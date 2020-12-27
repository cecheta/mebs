import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeSearch from '../../components/HomeSearch';
import Background from '../../components/Background';

const Home = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/charts');
      const data = [...response.data.artists, ...response.data.albums, ...response.data.songs];
      const filteredSuggestions = [...new Set(data)].filter((el) => el.length <= 15);

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
