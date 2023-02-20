import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card({
  card,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
  const isLiked = card.likes.some(user => user._id === currentUser._id);  // Определяем, лайкал ли пользователь карточку

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />

      <button
        type="button"
        className={`${isOwn ? 'card__delete-button' : ''}`}
        hidden={`${isOwn ? '' : 'hidden'}`}
        onClick={handleDeleteClick}>
      </button>

      <div className="card__description-container">
        <h2
          className="card__title">
          {card.name}
        </h2>
        <div className="card__like-container">
          <button
            type="button"
            className={`card__like-button ${isLiked ? 'card__like-button_active' : ''}`}
            onClick={handleLikeClick}>
          </button>
          <p className="card__like-count">
            {card.likes.length}
          </p>
        </div>
      </div>
    </div>
  );

}

export default Card;