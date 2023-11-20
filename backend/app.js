const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');
const db = require('./db.js');
const taskRoutes = require('./routes/tasks-routes.js');

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(cors());

app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log('Running on PORT', PORT);
});
