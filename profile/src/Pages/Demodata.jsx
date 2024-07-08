import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const Demodata = () => {
  const [series, setSeries] = useState([]);
  const [lineSeries, setLineSeries] = useState([]);
  const [barSeries, setBarSeries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filter, setFilter] = useState({ dateFrom: '', dateTo: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/https://demo-cs.blr1.cdn.digitaloceanspaces.com/test/hdfc.json');
        const dataArray = response.data;

        console.log('Fetched Data:', dataArray);

        const parsePrice = (price) => {
          if (typeof price === 'string') {
            return parseFloat(price.replace(/,/g, ''));
          }
          return null;
        };

        const chartData = dataArray.map(data => {
          const openPrice = parsePrice(data['Open Price']);
          const highPrice = parsePrice(data['High Price']);
          const lowPrice = parsePrice(data['Low Price']);
          const closePrice = parsePrice(data['Close Price']);

          if (openPrice === null || highPrice === null || lowPrice === null || closePrice === null) {
            console.error('Missing or invalid required price data:', data);
            return null;
          }

          return {
            x: new Date(data.Date).getTime(),
            y: [openPrice, highPrice, lowPrice, closePrice]
          };
        }).filter(entry => entry !== null);

        const lineChartData = dataArray.map(data => {
          const closePrice = parsePrice(data['Close Price']);
          if (closePrice === null) {
            console.error('Missing or invalid required close price data:', data);
            return null;
          }
          return {
            x: new Date(data.Date).getTime(),
            y: closePrice
          };
        }).filter(entry => entry !== null);

        const barChartData = dataArray.map(data => {
          const totalTradedQuantity = parsePrice(data['Total Traded Quantity']);
          if (totalTradedQuantity === null) {
            console.error('Missing or invalid required total traded quantity data:', data);
            return null;
          }
          return {
            x: new Date(data.Date).getTime(),
            y: totalTradedQuantity
          };
        }).filter(entry => entry !== null);

        console.log('Candlestick Data:', chartData);
        console.log('Line Chart Data:', lineChartData);
        console.log('Bar Chart Data:', barChartData);

        setSeries([{ data: chartData }]);
        setLineSeries([{ name: 'Close Price', data: lineChartData }]);
        setBarSeries([{ name: 'Total Traded Quantity', data: barChartData }]);
        setTableData(dataArray);
        setFilteredData(dataArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
  };

  const handleFilter = () => {
    const { dateFrom, dateTo } = filter;
    const filtered = tableData.filter(data => {
      const date = new Date(data.Date);
      const fromDate = dateFrom ? new Date(dateFrom) : null;
      const toDate = dateTo ? new Date(dateTo) : null;
      return (!fromDate || date >= fromDate) && (!toDate || date <= toDate);
    });
    setFilteredData(filtered);
  };

  const candlestickOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: 'Candlestick Chart for HDFCBANK',
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

  const lineChartOptions = {
    chart: {
      type: 'line',
      height: 350,
    },
    title: {
      text: 'Line Chart for Close Prices',
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

  const barChartOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    title: {
      text: 'Bar Chart for Total Traded Quantity',
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
    <div className="data-visualization-container" style={{ backgroundColor: 'black' }}>
      <h1 style={{ color: 'whitesmoke' }}>Data Visualization</h1>
      
      <div className="charts">
        <div className="chart">
          <Chart options={candlestickOptions} series={series} type="candlestick" height={350} />
        </div>
        <div className="chart">
          <Chart options={lineChartOptions} series={lineSeries} type="line" height={350} />
        </div>
        <div className="chart">
          <Chart options={barChartOptions} series={barSeries} type="bar" height={350} />
        </div>
      </div>

      <h2 style={{ color: 'whitesmoke', marginTop: '20px' }}>Data Table</h2>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ color: 'whitesmoke' }}>
          From: <input type="date" value={filter.dateFrom} onChange={(e) => setFilter({ ...filter, dateFrom: e.target.value })} />
        </label>
        <label style={{ color: 'whitesmoke', marginLeft: '10px' }}>
          To: <input type="date" value={filter.dateTo} onChange={(e) => setFilter({ ...filter, dateTo: e.target.value })} />
        </label>
        <button onClick={handleFilter} style={{ marginLeft: '10px' }}>Filter</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', color: 'whitesmoke' }}>
        <thead>
          <tr>
            {['Date', 'Open Price', 'High Price', 'Low Price', 'Close Price', 'Total Traded Quantity', 'Turnover ₹'].map(key => (
              <th
                key={key}
                style={{ border: '1px solid whitesmoke', padding: '8px', cursor: 'pointer' }}
                onClick={() => handleSort(key)}
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid whitesmoke', padding: '8px' }}>{data.Date}</td>
              <td style={{ border: '1px solid whitesmoke', padding: '8px' }}>{data['Open Price']}</td>
              <td style={{ border: '1px solid whitesmoke', padding: '8px' }}>{data['High Price']}</td>
              <td style={{ border: '1px solid whitesmoke', padding: '8px' }}>{data['Low Price']}</td>
              <td style={{ border: '1px solid whitesmoke', padding: '8px' }}>{data['Close Price']}</td>
              <td style={{ border: '1px solid whitesmoke', padding: '8px' }}>{data['Total Traded Quantity']}</td>
              <td style={{ border: '1px solid whitesmoke', padding: '8px' }}>{data['Turnover ₹']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Demodata;
