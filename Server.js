// app.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // XAMPP default user
  password: '', // XAMPP default password is empty
  database: 'formdata'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Handle form data submission
app.post('/submit', (req, res) => {
    const { name, email, phone, message } = req.body;
    const query = 'INSERT INTO form_entries (name, email, phone, message) VALUES (?, ?, ?, ?)';
  
    // Pass all four values (name, email, phone, message)
    db.query(query, [name, email, phone, message], (err, result) => {
      if (err) throw err;
      res.sendFile(path.join(__dirname, 'public', 'submitted.html'));
    });
  });

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
