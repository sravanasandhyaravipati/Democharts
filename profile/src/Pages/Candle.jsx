import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const Candlestick = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/candlestick-data');
        const data = response.data;

        if (Array.isArray(data) && data.length > 0 && typeof data[0].x === 'number' && Array.isArray(data[0].y) && data[0].y.length === 4) {
          setSeries([{ data }]);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: 'Candlestick Chart',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="candlestick-container">
      <h1>Candlestick Chart</h1>
      <Chart options={options} series={series} type="candlestick" height={350} />
    </div>
  );
};

export default Candlestick;
