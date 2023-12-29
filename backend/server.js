// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors module

const app = express();
const port = 3001;
app.use(cors({  origin: 'http://localhost:3000',
}));

// MySQL Database Configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'buildingmeterics',
  port:"33061",

});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL');
});

app.use(bodyParser.json());

// API endpoint to get data
app.post('/data', (req, res) => {
  connection.query('SELECT * FROM buildingmeterics.property1;', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Add Row endpoint
app.post('/addRow', (req, res) => {
  const newRow = req.body; // Assuming the request body contains the new row data
  connection.query('INSERT INTO property1 SET ?', newRow, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Save Data endpoint (for single or multiple rows)
app.post('/saveData', (req, res) => {
  const rows = req.body.rows; // Assuming the request body contains an array of rows
  const values = rows.map(row => `('${row.idproperty1}','${row.GrpName}', '${row.Reg_No}', '${row.trn}', '${row.Acct_No}', '${row.CustID1}','${row.CustID2}','${row.CustID3}','${row.CustID4}','${row.CustID5}')`).join(',');
  const query = `INSERT INTO property2 (GrpName, Reg_No, TRN, Acct_No, CustID1) VALUES ${values}`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
