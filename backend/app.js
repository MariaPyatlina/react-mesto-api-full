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

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(express.json());
mongoose.set('strictQuery', false);

app.use(requestLogger); // Подключаем логгер запросов до всех роутов

app.use(cors(allowedCors));

// Раскомментить перед ревью, удалить после
// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.post('/api/signin', celebrate({ // Маршрутизирует авторизацию
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/api/signup', celebrate({ // Маршрутизирует регистрацию
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().regex(/https?:\/\/(www\.)?[a-z0-9-\.\_\-~:\/?#[\]@!$&'\(\)\*\+,;=]+#?/),
  }),
}), createUser);

app.use('/api/users', userRoutes); // Маршрутизирует все запросы про пользователя

app.use('/api/cards', cardRoutes); // Маршрутизирует все запросы про карточки

app.use('/*', (req, res) => {// Маршрутизирует все неправильные запросы
  res.status(404).send({ message: 'Некорректный url' });
});

// Обрабатывает все ошибки
app.use(errorLogger); // логгер ошибок
app.use(errors()); // ошибки celebrate
app.use(handlerError);

mongoose.connect(MONGO_URL); // подключаемся к серверу mongo

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
