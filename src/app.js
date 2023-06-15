const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
//Routes
const userRouter = require('./routes/users.routes');
const repairsRouter = require('./routes/repairs.routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//Rutas endPoints.
app.use('/api/v1/users', userRouter);
app.use('/api/v1/repairs', repairsRouter);

module.exports = app;
