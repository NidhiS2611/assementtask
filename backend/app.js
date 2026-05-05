const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();
const cookies = require('cookie-parser');
app.use(cookies());

app.use(cors({
    origin: 'https://spirited-trust-production-bdc1.up.railway.app',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./routes/userroutes');
const projectRoutes = require('./routes/projectroutes');
const taskRoutes = require('./routes/taskroute');                


app.use('/user', authRoutes);
app.use('/project', projectRoutes);
app.use('/task', taskRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});