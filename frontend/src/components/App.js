import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupEditAvatar from './PopupEditAvatar';
import PopupEditProfile from './PopupEditProfile';
import PopupAddPlace from './PopupAddPlace';
import PopupRemoveCard from './PopupRemoveCard';
import ImagePopup from './ImagePopup';
import api from '../utils/api';

import CurrentUserContext from '../contexts/CurrentUserContext.js';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isRemoveCardPopupOpen, setIsRemoveCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  //Получение исходных данных
  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch(err => {
        console.log(`Ошибка при загрузке данных с сервера ${err}`)
      });
  }, []);


  //Лайки карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке

    api.changeLikeCardStatus(card._id, !isLiked) // Отправляем запрос в API и получаем обновлённые данные карточки
      .then((newCard) => {
        setCards((cards) => cards.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
      })
      .catch(err => {
        console.log(`Ошибка ${err}`)
      })
  }

  //Удаление карточки
  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(
        setCards(cards => cards.filter(c => c._id !== card._id))
      )
      .catch(err => {
        console.log(`Ошибка при удалении карточки ${err}`)
      })
  }

  //Обновление данных в профиле
  function handleUpdateUser({
    newUserName,
    newUserAbout
  }) {
    api.setUserData({
      newUserName,
      newUserAbout
    })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups()
      })
      .catch(err => {
        console.log(`Ошибка при загрузке данных с сервера ${err}`)
      })
  }

  //Обновление аватарки
  function handleUpdateAvatar(newUserAvatar) {
    api.updateAvatar(newUserAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups()
      })
      .catch(err => {
        console.log(`Ошибка при загрузке данных с сервера ${err}`)
      })
  }

  //Добавление карточки
  function handleAddPlace({
    newTitlePlace,
    newLinkPlace
  }) {
    api.sendNewCard({
      newTitlePlace,
      newLinkPlace
    })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch(err => {
        console.log(`Ошибка при загрузке данных с сервера ${err}`)
      })
  }


  //Функции открытия попапов
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // function handleRemoveCardClick(){
  //   setIsRemoveCardPopupOpen(true);
  // }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsRemoveCardPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser} >
        <Header />

        <Main cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          // onRemoveCard = {handleRemoveCardClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        <PopupEditAvatar isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <
          PopupEditProfile isOpen={
            isEditProfilePopupOpen
          }
          onClose={
            closeAllPopups
          }
          onUpdateUser={
            handleUpdateUser
          }
        />

        <
          PopupAddPlace isOpen={
            isAddPlacePopupOpen
          }
          onClose={
            closeAllPopups
          }
          onAddPlace={
            handleAddPlace
          }
        />

        <
          PopupRemoveCard isOpen={
            isRemoveCardPopupOpen
          }
          onClose={
            closeAllPopups
          }
        />

        <
          ImagePopup card={
            selectedCard
          }
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider >
    </>
  );
}

export default App;