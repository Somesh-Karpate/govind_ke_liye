// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchDrugs from './components/SearchDrugs';
import DrugDetails from './components/DrugDetails';
import Layout from './components/Layout'; // Import the Layout component

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<SearchDrugs />} />
          <Route path="/drug/:rxcui" element={<DrugDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
