const winston = require('winston');
const expressWinston = require('express-winston');

// создадим логгер запросов
const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: 'request.log' })], // куда нужно писать лог
  format: winston.format.json(), // в каком формате
});

// создадим логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = { requestLogger, errorLogger };
