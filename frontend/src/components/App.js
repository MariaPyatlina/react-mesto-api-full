import React from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import Main from './Main';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import PopupEditAvatar from './PopupEditAvatar';
import PopupEditProfile from './PopupEditProfile';
import PopupAddPlace from './PopupAddPlace';
import PopupRemoveCard from './PopupRemoveCard';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import * as apiAuth from '../utils/apiAuth'

import CurrentUserContext from '../contexts/CurrentUserContext.js';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isRemoveCardPopupOpen, setIsRemoveCardPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [signinState, setSigninState] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isloggedIn, setIsLoggedIn] = React.useState(false);
  const [emailState, setEmailState] = React.useState('');
  const history = useHistory();

  //Получение исходных данных
  React.useEffect(() => {
    if (isloggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          setCards(initialCards.data);
        })
        .catch(err => {
          console.log(`Ошибка при загрузке данных с сервера ${err}`)
        });
    }
  }, [isloggedIn]);

  React.useEffect(() => {
    checkToken();
  }, []);



  function handleRegister(password, email) {
    apiAuth.register(password, email)
      .then((data) => {
        if (data) {
          setSigninState(true);
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setSigninState(false);
        console.log(`Ошибка ${err}`)
      })
      .finally(() => setIsInfoTooltipOpen(true))
  }

  function handleLogin(password, email) {
    apiAuth.authorize(password, email)
      .then((data) => {
        if (!data.token) {
          return Promise.reject('Ошибка. Нет токена');
        }
        localStorage.setItem('jwt', data.token);
        api.setToken(data.token);
        setIsLoggedIn(true);
        setEmailState(email);
        history.push('/');
      })
      .then(() => {
        api.getUserData()
          .then((data) => {
            setCurrentUser(data);
          })
          .catch((err) => { console.log(`Ошибка ${err}`) });
      })
      .catch((err) => {
        setSigninState(false);
        setIsInfoTooltipOpen(true);
        console.log(`Ошибка ${err}`)
      });
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      apiAuth.checkToken(jwt)
        .then((res) => {
          if (res) {
            api.setToken(jwt);
            setIsLoggedIn(true);
            setEmailState(res.email);
            history.push('/');
          }
        })
        .catch(err => {
          console.log(`Ошибка ${err}`)
        });
    }
  }

  function handleExit() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setCurrentUser({});
    setEmailState('');
  }

  //Лайки карточки
  function handleCardLike(card) {
    console.log('cardas like', cards);
    const isLiked = card.likes.some(user => user._id === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке

    api.changeLikeCardStatus(card._id, !isLiked) // Отправляем запрос в API и получаем обновлённые данные карточки
      .then((newCard) => {
        setCards((cards) => cards.map((currentCard) => currentCard._id === card._id ? newCard.data : currentCard));
      })
      .catch(err => {
        console.log(`Ошибка ${err}`)
      })
  }

  //Удаление карточки
  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== card._id))
      })
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
        setCurrentUser(data.data);
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
        setCurrentUser(data.data);
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
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div className="content">
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={isloggedIn}
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            //onRemoveCard = {handleRemoveCardClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            email={emailState}
            onExit={handleExit}
          />

          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>

          <Route path="*">
            {isloggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>

        </Switch>
      </div>



      <PopupEditAvatar isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <PopupEditProfile
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <PopupAddPlace
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />

      <PopupRemoveCard
        isOpen={isRemoveCardPopupOpen}
        onClose={closeAllPopups}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        status={signinState}
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider >
  );
}

export default App;