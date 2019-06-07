const express = require('express');
let app = express();
const bodyparser = require('body-parser');
const helpers = require("./helpers");
const mysqlConnection = require("./dbcon")
const morgan = require('morgan');

app.use(bodyparser.json());
app.use(express.urlencoded());

app.use(morgan('dev'));

app.listen(8030, () => console.log('Express server is running'));

app.get('/api/payment/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(403);
    return;
  }
  mysqlConnection.query(`SELECT * FROM payment WHERE id = ${req.params.id}`, (err, rows, fields) => {
    if (!err) {
      if (rows.length === 0) {
        res.status(404);
        res.send("Not Found");
      } else {
        res.send(rows);
      }
    } else {
      res.sendStatus(500);
    }
  })
});

app.post('/api/payment', (req, res) => {
  const val = req.body;
  if (isNaN(val.amount) || typeof val.description !== 'string') {
    // res.status(403);
    res.sendStatus(403);
    return;
  }
  const sql = 'INSERT INTO payment (description, amount, time, date) VALUES (?, ?, ?, ?)';
  mysqlConnection.query(sql, [val.description, val.amount, time(), date()], (err, rows, fields) => {
    if (!err)
      res.json({
        new_id: {
          message: rows.insertId.message
        }
      });
    else
      console.log(err);
    res.sendStatus(500);
  })
});

app.get('/api/payment/:id/:confirm', (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(403);
    return;
  }
  const sqlSel = 'SELECT time FROM payment WHERE id = ?';
  const val = req.body;
  mysqlConnection.query(sqlSel, [val.id], (err, rows, fields) => {
    if (!err) {
      const sqlUpdcon = `UPDATE payment SET (confirmed = ?) WHERE id = ?`;
      mysqlConnection.query(sqlUpdcon, [val.confirmed, val.id], (err, rows, fields) => {
        if (!err) {
          if (rows.length === 0) {
            res.sendStatus(404).send("Not Found");
          } else
            var time = res.send("confirmed");
        } else
          res.sendStatus(500);
      })
      if (timeDelay(time) === true) {
        const sqlUpd = 'UPDATE payment SET (confirmed = ?) WHERE id = ?';
        mysqlConnection.query(sqlUpd, [val.confirmed, val.id], (err, rows, fields) => {
          if (!err)
            res.send("confirmed");
          else
            res.sendStatus(500);
        })
      } else
        res.send("Delay confirmed");
    } else
      res.sendStatus(500);
  })
});

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});
