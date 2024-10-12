// src/components/SearchDrugs.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchDrugs = () => {
  const [query, setQuery] = useState('');
  const [drugResults, setDrugResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchDrugs = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${query}`);
      const data = await response.json();

      if (data.drugGroup?.conceptGroup) {
        const drugs = data.drugGroup.conceptGroup.flatMap(group => group.conceptProperties || []);
        setDrugResults(drugs);
      } else {
        setDrugResults([]);
        setError('No drugs found.');
      }
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) fetchDrugs();
  };

  const handleViewDetails = (drug) => {
    navigate(`/drug/${drug.rxcui}`, { state: { drug } }); // Pass the drug object
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">Drug Search</h1>
      <form onSubmit={handleSearch} className="flex justify-center mb-5">
        <input
          type="text"
          placeholder="Enter drug name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded-l-md w-3/4"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {drugResults.length > 0 && (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {drugResults.map((drug) => (
              <tr key={drug.rxcui} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{drug.rxcui}</td>
                <td className="border border-gray-300 p-2">{drug.name}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleViewDetails(drug)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchDrugs;
