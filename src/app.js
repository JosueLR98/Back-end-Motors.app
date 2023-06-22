const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const AppError = require('././utils/appError');
const globalErrorHandler = require('./controllers/error.controller');
//Routes
const userRouter = require('./routes/users.routes');
const repairsRouter = require('./routes/repairs.routes');

const app = express();

app.use(express.json());

app.use(cors());
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Rutas endPoints.
app.use('/api/v1/users', userRouter);
app.use('/api/v1/repairs', repairsRouter);

app.all('*', (req, res, next) => {
  //capta toso los errores por default
  return next(
    new AppError(`Catn fond ${req.originalUrl} on this server..!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
