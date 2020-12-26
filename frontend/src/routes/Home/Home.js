import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import HomeSearch from '../../components/HomeSearch';
import Background from '../../components/Background';

const Home = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestion, setSuggestion] = useState(null);

  const randomSuggestion = useCallback((suggestions) => {
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/charts');
      const data = [...response.data.artists, ...response.data.albums, ...response.data.songs];
      const filteredSuggestions = [...new Set(data)].filter((el) => el.length <= 15);

      setSuggestions(filteredSuggestions);
      setSuggestion(randomSuggestion(filteredSuggestions));
    })();
  }, [randomSuggestion]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSuggestion(randomSuggestion(suggestions));
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [suggestion, suggestions, randomSuggestion]);

  return (
    <>
      <Background />
      <HomeSearch suggestion={suggestion} />
    </>
  );
};

export default Home;
