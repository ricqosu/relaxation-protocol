const db = require('../db.js');

const getTasksFromDayNumber = async (req, res) => {
  let { dayNumber } = req.params;
  dayNumber = parseInt(dayNumber);

  if (isNaN(dayNumber)) {
    return res.status(400).json({ error: 'Invalid day number in parameter' });
  }

  try {
    const result = await db.query(
      `
    SELECT tasks.task, tasks.duration 
    FROM tasks 
    INNER JOIN days ON tasks.day_id = days.day_number
    WHERE days.day_number=$1
    `,
      [dayNumber]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getTasksFromDayNumber;
