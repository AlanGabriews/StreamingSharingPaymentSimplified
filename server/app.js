const express = require('express');
const path = require('path');
const usersRouter = require('./routes/users');
const groupsRouter = require('./routes/groups');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/users', usersRouter);
app.use('/api/groups', groupsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});