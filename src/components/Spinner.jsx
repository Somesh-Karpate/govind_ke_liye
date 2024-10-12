// src/components/Spinner.jsx

import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-32">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 8px solid rgba(255, 255, 255, 0.2);
          border-left-color: #4c51bf; /* Change this to your primary color */
          border-radius: 50%;
          width: 64px;
          height: 64px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
