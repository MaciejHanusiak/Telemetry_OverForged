const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json({ limit: '10mb' }));

const connection = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

app.post('/telemetry', (req, res) => {
  const data = req.body;
  data.timestamp = new Date();

  const sql = "INSERT INTO events SET ?";
  connection.query(sql, data, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("error");
    } else {
      res.send("ok");
    }
  });
});

app.listen(process.env.PORT || 3000);