require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { handlerError } = require('./middlewares/handlerError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { allowedCors } = require('./utils/allowedCors');
const { LINK_REGEX } = require('./utils/regularExpression');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const { PAGE_NOT_FOUND_ERROR_MSG } = require('./utils/constants');
const NotFoundError = require('./error/notFoundError');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', false);

app.use(requestLogger); // Подключаем логгер запросов до всех роутов



// Раскомментить перед ревью, удалить после
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({ // Маршрутизирует авторизацию
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({ // Маршрутизирует регистрацию
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(LINK_REGEX),
  }),
}), createUser);

app.use('/users', userRoutes); // Маршрутизирует все запросы про пользователя

app.use('/cards', cardRoutes); // Маршрутизирует все запросы про карточки

app.use('/*', (req, res, next) => { // Маршрутизирует все неправильные запросы
  next(new NotFoundError(PAGE_NOT_FOUND_ERROR_MSG));
});

// Обрабатывает все ошибки
app.use(errorLogger); // логгер ошибок
app.use(errors()); // ошибки celebrate
app.use(handlerError);

mongoose.connect(MONGO_URL); // подключаемся к серверу mongo

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
