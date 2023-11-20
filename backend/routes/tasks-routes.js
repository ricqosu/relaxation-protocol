const express = require('express');
const router = express.Router();
const getTasksFromDayNumber = require('../controllers/tasks-controller');

router.get('/', (req, res) => {
  res.json('Hi');
});

router.get('/:dayNumber', getTasksFromDayNumber);

module.exports = router;
