import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';

function MyComponent() {
  const [data] = useState([]);
  const [isLoading] = useState(false);
  const [error] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Replace with your CORS proxy URL
          await fetch(`${proxyUrl}https://demo-cs.blr1.cdn.digitaloceanspaces.com/test/hdfc.json`);
          
        } catch (error) {
          if (error.name === 'SyntaxError') {
            console.error('Error parsing JSON data:', error);
            // Handle the invalid JSON scenario (e.g., display an error message)
          } else {
            console.error('Error fetching data:', error);
          }
        }
      };
      
    fetchData();
  }, []);

  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    xaxis: {
      title: {
        text: 'Time',
      },
      type: 'datetime',
    },
    yaxis: {
      title: {
        text: 'Price',
      },
    },
  };

  return (
    <div className="chart-container" style={{'backgroundColor':'black'}}>
      {isLoading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
        <ApexCharts options={options} series={data} type="candlestick" width={500} />
      )}
    </div>
  );
}

export default MyComponent;
