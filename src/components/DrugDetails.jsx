// src/components/DrugDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner'; // Import the Spinner component

const DrugDetails = () => {
  const { rxcui } = useParams();
  const [drugDetails, setDrugDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDrugDetails = async () => {
      try {
        const response = await fetch(`https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/ndcs.json`);
        const data = await response.json();

        if (data.ndcGroup?.ndcList?.ndc) {
          setDrugDetails(data.ndcGroup.ndcList.ndc);
        } else {
          setError('No details found for this drug.');
        }
      } catch (err) {
        setError('Error fetching drug details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDrugDetails();
  }, [rxcui]);

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-4">Drug Details</h1>
      {loading && <Spinner />} {/* Use the Spinner component for loading state */}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {drugDetails && (
        <ul className="list-disc list-inside">
          {drugDetails.map((ndc, index) => (
            <li key={index} className="border-b border-gray-300 py-2">NDC: {ndc}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DrugDetails;
