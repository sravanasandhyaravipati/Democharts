/*const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sandhya",
  database: "mydb",
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

app.get('/api/candlestick-data', (req, res) => {
    const query = 'SELECT * FROM candlestick_data';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error executing query');
        return;
      }
  
      try {
        // Log fetched results
        console.log('Fetched results from MySQL:', results);
  
        // Data transformation to candlestick format
        const candlestickData = transformToCandlestick(results);
        console.log('Candlestick Data:', candlestickData); // Log candlestickData to inspect structure
  
        res.json(candlestickData);
      } catch (error) {
        console.error('Error transforming data:', error);
        res.status(500).send('Error transforming data');
      }
    });
  });
// Function to transform data to candlestick format
function transformToCandlestick(data) {
    const groupedData = data.reduce((acc, trade) => {
      const date = new Date(trade.date_file); // Convert date_file to a Date object
  
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(trade);
  
      return acc;
    }, {});
  
    const candlestickData = Object.keys(groupedData).map(date => {
      const trades = groupedData[date];
      const open = parseFloat(trades[0].open.replace(',', '')); // First trade price
      const close = parseFloat(trades[trades.length - 1].close.replace(',', '')); // Last trade price
      const high = Math.max(...trades.map(trade => parseFloat(trade.high.replace(',', '')))); // Highest trade price
      const low = Math.min(...trades.map(trade => parseFloat(trade.low.replace(',', '')))); // Lowest trade price
  
      return {
        x: new Date(date).getTime(), // Unix timestamp
        y: [open, high, low, close], // [open, high, low, close] for candlestick
      };
    });
  
    return candlestickData;
  }
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});*/
/*const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sandhya",
  database: "firstdb",
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

app.get('/api/candlestick-data', (req, res) => {
  const query = 'SELECT * FROM merge_csv';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }

    try {
      const candlestickData = transformToCandlestick(results);
      res.json(candlestickData);
    } catch (error) {
      console.error('Error transforming data:', error);
      res.status(500).send('Error transforming data');
    }
  });
});

function transformToCandlestick(data) {
  const groupedData = data.reduce((acc, trade) => {
    const date = trade.date_file.split('T')[0]; // Extract the date part
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(trade);
    return acc;
  }, {});

  const candlestickData = Object.keys(groupedData).map(date => {
    const trades = groupedData[date];
    const open = parseFloat(trades[0]['Trade Price / Wght. Avg. Price'].replace(',', ''));
    const close = parseFloat(trades[trades.length - 1]['Trade Price / Wght. Avg. Price'].replace(',', ''));
    const high = Math.max(...trades.map(trade => parseFloat(trade['Trade Price / Wght. Avg. Price'].replace(',', ''))));
    const low = Math.min(...trades.map(trade => parseFloat(trade['Trade Price / Wght. Avg. Price'].replace(',', ''))));

    return {
      x: new Date(date).getTime(), // Unix timestamp
      y: [open, high, low, close], // [open, high, low, close] for candlestick
    };
  });

  return candlestickData;
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});*/
const corsAnywhere = require('cors-anywhere');
const express = require('express');
const app = express();
const port = 3001;


const host = 'localhost';
const corsPort = 8080;

corsAnywhere.createServer({
  originWhitelist: [], 
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2']
}).listen(corsPort, host, () => {
  console.log(`Running CORS Anywhere on ${host}:${corsPort}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

