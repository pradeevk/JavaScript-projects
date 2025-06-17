
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM events ORDER BY date DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(results);
  });
});

router.get('/search', (req, res) => {
  const name = req.query.name || '';
  const location = req.query.location || '';
  const sql = `SELECT * FROM events WHERE eventName LIKE ? OR location LIKE ? ORDER BY date DESC`;
  db.query(sql, [`%${name}%`, `%${location}%`], (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { eventName, date, location, cost } = req.body;
  if (!eventName || !date || !location || !cost) return res.status(400).json({ error: 'Missing fields' });

  const sql = 'INSERT INTO events (eventName, date, location, cost) VALUES (?, ?, ?, ?)';
  db.query(sql, [eventName, date, location, cost], (err, result) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.status(201).json({ message: 'Event added', id: result.insertId });
  });
});

module.exports = router;

router.delete('/', (req, res) => {
  db.query('DELETE FROM events', (err) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    res.json({ message: 'All events cleared' });
  });
});
