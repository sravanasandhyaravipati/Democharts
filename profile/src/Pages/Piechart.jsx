import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const Piedata = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filter, setFilter] = useState({ dateFrom: '', dateTo: '' });
  const [pieSeries, setPieSeries] = useState([]);
  const [pieLabels, setPieLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/https://demo-cs.blr1.cdn.digitaloceanspaces.com/test/hdfc.json');
        const dataArray = response.data;

        console.log('Fetched Data:', dataArray);

        setTableData(dataArray);
        setFilteredData(dataArray);

        // Prepare data for the pie chart
        const firstEntry = dataArray[0];
        if (firstEntry) {
          setPieSeries([
            parseFloat(firstEntry['Total Traded Quantity'].replace(/,/g, '')),
            parseFloat(firstEntry['Turnover ₹'].replace(/,/g, '')),
            parseFloat(firstEntry['No. of Trades'].replace(/,/g, '')),
            parseFloat(firstEntry['Deliverable Qty'].replace(/,/g, ''))
          ]);
          setPieLabels([
            'Total Traded Quantity',
            'Turnover ₹',
            'No. of Trades',
            'Deliverable Qty'
          ]);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
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

  const pieOptions = {
    chart: {
      type: 'pie',
      height: 350,
    },
    labels: pieLabels,
    title: {
      text: 'Pie Chart Representation',
      align: 'left',
    },
  };

  return (
    <div className="data-visualization-container" style={{ 'backgroundColor': 'black' }}>
      <h1 style={{ 'color': 'whitesmoke' }}>Data Visualization</h1>
      
      <div className="charts">
        <div className="chart">
          <Chart options={pieOptions} series={pieSeries} type="pie" height={350} />
        </div>
      </div>

      <h2 style={{ 'color': 'whitesmoke', 'marginTop': '20px' }}>Data Table</h2>

      <div style={{ 'marginBottom': '20px' }}>
        <label style={{ 'color': 'whitesmoke' }}>
          From: <input type="date" value={filter.dateFrom} onChange={(e) => setFilter({ ...filter, dateFrom: e.target.value })} />
        </label>
        <label style={{ 'color': 'whitesmoke', 'marginLeft': '10px' }}>
          To: <input type="date" value={filter.dateTo} onChange={(e) => setFilter({ ...filter, dateTo: e.target.value })} />
        </label>
        <button onClick={handleFilter} style={{ 'marginLeft': '10px' }}>Filter</button>
      </div>

      <table style={{ 'width': '100%', 'borderCollapse': 'collapse', 'color': 'whitesmoke' }}>
        <thead>
          <tr>
            <th style={{ 'border': '1px solid whitesmoke', 'padding': '8px', 'cursor': 'pointer' }} onClick={() => handleSort('Date')}>Date</th>
            <th style={{ 'border': '1px solid whitesmoke', 'padding': '8px', 'cursor': 'pointer' }} onClick={() => handleSort('Open Price')}>Open Price</th>
            <th style={{ 'border': '1px solid whitesmoke', 'padding': '8px', 'cursor': 'pointer' }} onClick={() => handleSort('High Price')}>High Price</th>
            <th style={{ 'border': '1px solid whitesmoke', 'padding': '8px', 'cursor': 'pointer' }} onClick={() => handleSort('Low Price')}>Low Price</th>
            <th style={{ 'border': '1px solid whitesmoke', 'padding': '8px', 'cursor': 'pointer' }} onClick={() => handleSort('Close Price')}>Close Price</th>
            <th style={{ 'border': '1px solid whitesmoke', 'padding': '8px', 'cursor': 'pointer' }} onClick={() => handleSort('Total Traded Quantity')}>Total Traded Quantity</th>
            <th style={{ 'border': '1px solid whitesmoke', 'padding': '8px', 'cursor': 'pointer' }} onClick={() => handleSort('Turnover ₹')}>Turnover ₹</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={index}>
              <td style={{ 'border': '1px solid whitesmoke', 'padding': '8px' }}>{data.Date}</td>
              <td style={{ 'border': '1px solid whitesmoke', 'padding': '8px' }}>{data['Open Price']}</td>
              <td style={{ 'border': '1px solid whitesmoke', 'padding': '8px' }}>{data['High Price']}</td>
              <td style={{ 'border': '1px solid whitesmoke', 'padding': '8px' }}>{data['Low Price']}</td>
              <td style={{ 'border': '1px solid whitesmoke', 'padding': '8px' }}>{data['Close Price']}</td>
              <td style={{ 'border': '1px solid whitesmoke', 'padding': '8px' }}>{data['Total Traded Quantity']}</td>
              <td style={{ 'border': '1px solid whitesmoke', 'padding': '8px' }}>{data['Turnover ₹']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Piedata;
