const express = require('express');
let app = express();
const bodyparser = require('body-parser');
const help = require("./help");
const mysqlConnection = require("./dbcon")

app.use(bodyparser.json());

app.listen(8030, () => console.log('Express server is running'));

app.get('/api/payment/:id', (req, res) => {
  if(req.params.id !== '1'){
    res.sendStatus(404).send("Not Found");
  }else{
  mysqlConnection.query('SELECT * FROM payment WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
    else {
       res.sendStatus(500);
    }
  })
}
});

app.post('/api/payment', (req, res) => {

  const sql = 'INSERT INTO payment (id, description, amount, time, date) VALUES (?, ?, ?, ?, ?)';
  const val = req.body;
  mysqlConnection.query(sql, [val.id, val.description, val.amount, time(), date()], (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      res.sendStatus(500);
  })
});

app.get('/api/payment/:id/:confirm', (req, res) => {
  if(req.params.id !== '1'){
    res.sendStatus(404).send("Not Found");
  }else{
  const sqlSel = 'SELECT time FROM payment WHERE id = ?';
  const val = req.body;
  mysqlConnection.query(sqlSel, [val.id], (err, rows, fields) => {
    if (!err) {
      const sqlUpdcon = `UPDATE payment SET (confirmed = ?) WHERE id = ?`;
      mysqlConnection.query(sqlUpdcon, [val.confirmed ,val.id], (err, rows, fields) => {
        if (!err)
          var time = res.send("confirmeddd");
        else
          res.sendStatus(500);
      })
      if (timeDelay(time) === true) {
        const sqlUpd = 'UPDATE payment SET (confirmed = ?) WHERE id = ?';
        mysqlConnection.query(sqlUpd, [val.confirmed ,val.id], (err, rows, fields) => {
          if (!err)
            res.send("confirmed");
          else
            res.sendStatus(500);
        })
      }
      else
        res.send("Delay confirmed");
    }
    else
      res.sendStatus(500);
  })
}
});
