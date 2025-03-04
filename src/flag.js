import React, { useState, useEffect } from 'react';

const CountryFlags = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://xcountries-backend.azurewebsites.net/all');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Country Flags</h1>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '20px', 
        padding: '20px' 
      }}>
        {countries.map((country) => (
          <div 
            key={country.alpha2Code} 
            style={{ 
              width: '150px', 
              padding: '10px', 
              borderRadius: '8px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
              textAlign: 'center', 
              backgroundColor: '#fff' 
            }}
          >
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              style={{ width: '100px', height: 'auto', marginBottom: '10px' }}
            />
            <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold' }}>{country.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryFlags;