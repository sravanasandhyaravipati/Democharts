import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2'; 
import { Chart, LinearScale, CategoryScale, BarElement, LineElement, plugins, Title, Legend, Tooltip } from 'chart.js';

Chart.register(LinearScale, CategoryScale, BarElement, LineElement, plugins, Title, Legend, Tooltip);

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const data = {
  labels,
  datasets: [
    {
      label: '2023 Expense',
      data: [100, 200, 300, 400, 500, 600],
      backgroundColor: 'black',
    },
    {
      label: '2024 Expense',
      data: [300, 400, 100, 600, 700, 100],
      backgroundColor: 'red',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Expensive Tracker',
    },
  },
};

const Barchart = () => {
  const [chartType, setChartType] = useState('bar');
  const chartTypes = ['bar', 'line', 'pie'];

  const renderChart = () => {
    const chartComponent = {
      bar: <Bar options={options} data={data} />,
      line: <Line options={options} data={data} />,
      pie: <Pie options={options} data={data} />,
    }[chartType];

    return chartComponent;
  };

  return (
    <div>
      
      {chartTypes.map((type) => (
        <button key={type} onClick={() => setChartType(type)}>
          {type.toUpperCase()} Chart
        </button>
      ))}
      <div style={{ height: 400, width: 800, margin: 'auto' }}>
        {renderChart()}
      </div>
    </div>
  );
};

export default Barchart;

