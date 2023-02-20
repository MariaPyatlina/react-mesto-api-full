const Card = require('../models/card');
const BadRequestError = require('../error/badRequestError');
const NotFoundError = require('../error/notFoundError');
const ForbiddenError = require('../error/forbiddenError');

const {
  BAD_REQUEST_ERROR_MSG,
  CARD_NOT_FOUND_ERROR_MSG,
  FORBIDDEN_ERROR_MSG,
} = require('../utils/constants');

function createCard(req, res, next) {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`${BAD_REQUEST_ERROR_MSG} Проверьте правильность запроса.`));
      }
      return next(err);
    });
}

function getAllCards(req, res, next) {
  Card.find(req.body)
    .populate(['owner', 'likes'])
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
}

function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .populate('owner')
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(CARD_NOT_FOUND_ERROR_MSG));
      }
      if (card.owner.id !== req.user._id) {
        return next(new ForbiddenError(`${FORBIDDEN_ERROR_MSG}. Нельзя удалить чужую карточку`));
      }
      return card.remove();
    })
    .then(() => res.status(200).send({ message: `Карточка ${req.params.cardId} удалена` }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(BAD_REQUEST_ERROR_MSG));
      }
      return next(err);
    });
}

function setLikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(CARD_NOT_FOUND_ERROR_MSG));
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(BAD_REQUEST_ERROR_MSG));
      }
      return next(err);
    });
}

function removeLikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(CARD_NOT_FOUND_ERROR_MSG));
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(BAD_REQUEST_ERROR_MSG));
      }
      return next(err);
    });
}

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  setLikeCard,
  removeLikeCard,
};
