import React from 'react';
import Tabs from '../../components/Tabs/Tabs';
import Results from './Results/Results';
import './ResultsPage.scss';

const ResultsPage = () => {
  return (
  <div className="ResultsPage">
    <Tabs />
    <Results />
  </div>
  );
};

export default ResultsPage;
