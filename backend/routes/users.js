const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth');
const {
  getAllUsers, getUser, getUserMe, updateUser, updateUserAvatar,
} = require('../controllers/users');
const { LINK_REGEX } = require('../utils/regularExpression');

router.get('/', auth, getAllUsers);

router.get('/me', auth, getUserMe);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), auth, getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), auth, updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(LINK_REGEX),
  }),
}), auth, updateUserAvatar);

module.exports = router;
