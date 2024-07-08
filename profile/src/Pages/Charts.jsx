import React, { useState } from "react";
import Chart from "react-apexcharts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


function Charts() {
  const [options] = useState({
    colors: ["#2196F3", "#87CEEB"], // Blue and Skyblue colors
    chart: {
      id: "basic-chart",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  });

  const [series] = useState([
    {
      name: "My Earnings",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
    {
      name: "My Expenses",
      data: [3, 60, 35, 80, 49, 70, 20, 81],
    },
  ]);

  const [pieOptions] = useState({
    labels: ["Earnings", "Expenses", "Savings", "Investments", "Others"],
    colors: ["#2196F3", "#87CEEB", "#FF5733", "#33FF57", "#FFC300"],
  });

  const [pieSeries] = useState([44, 55, 13, 43, 22]);

  return (
    <div className="App"style={{'backgroundColor':'black'}}>
      <h2>
        My Income Data <FontAwesomeIcon icon={faUser} />
      </h2>
      <div className="row">
        <div className="col-4">
          <Chart options={options} series={series} type="bar" width="450" />
        </div>
        <div className="col-4">
          <Chart options={options} series={series} type="line" width="450" />
        </div>
        <div className="col-4">
          <Chart options={options} series={series} type="area" width="450" />
        </div>
        <div className="col-4">
          <Chart options={options} series={series} type="radar" width="450" />
        </div>
        <div className="col-4">
          <Chart options={options} series={series} type="histogram" width="450" />
        </div>
        <div className="col-4">
          <Chart options={options} series={series} type="scatter" width="450" />
        </div>
        <div className="col-4">
          <Chart options={options} series={series} type="heatmap" width="450" />
        </div>
        <div className="col-4">
          <Chart options={pieOptions} series={pieSeries} type="pie" width="450" />
          <table style={{
            marginLeft: '20px',
            borderCollapse: 'collapse',
            width: '200px',
            border: '1px solid #ddd',
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Category</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {pieOptions.labels.map((label, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{label}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{pieSeries[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-4">
          <Chart options={pieOptions} series={pieSeries} type="donut" width="450" />
        </div>
        <div className="col-4">
          <Chart options={options} series={series} type="radialBar" width="450" />
        </div>
        <div className="col-4">
          <Chart options={options} series={series} type="bubble" width="450" />
        </div>
        <div className="col-4">
          <Chart options={options} series={series} type="treemap" width="450" />
        </div>
        <div className="col-4">
          <Chart options={options} series={series} type="polarArea" width="450" />
        </div>
        <div className="col-4">
          <Chart options={options} series={series} type="rangeBar" width="450" />
        </div>
        <div className="col-4">
          <Chart options={options} series={series} type="candlestick" width="450" />
        </div>
      </div>
    </div>
  );
}

export default Charts;
