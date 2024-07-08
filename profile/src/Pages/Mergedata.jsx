import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const Mergedata = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/candlestick-data');
        const data = response.data;

        const chartData = data.map(item => ({
          x: new Date(item.x), // Ensure date is converted to Unix timestamp
          y: item.y.map(value => parseFloat(value))
        }));

        setSeries([{ data: chartData }]);
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
    <div className="candlestick-container" style={{'backgroundColor':'black'}}>
      <h1>Candlestick Chart</h1>
      <Chart options={options} series={series} type="candlestick" height={350} />
    </div>
  );
};

export default Mergedata;
