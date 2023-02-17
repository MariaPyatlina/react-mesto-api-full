export const config = {
  baseUrl: 'http://api.mesto.for.students.nomoredomains.work',
  headers: { 'Content-Type': 'application/json' },
}

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl; //строка
    this._headers = options.headers; //Здесь можеть быть объект с несколькими заголовками
  }

  setToken(token) {
    this._headers.authorization = `Bearer ${token}`;
  }

  //Обработать ответы в запросах.
  _parseAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    else Promise.reject(`Ошибка ${res.status}`);
  }

  //------------ПРО КАРТОЧКИ--------------------------------
  //Забирает массив карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    }) //В ответ придет массив карточек
      .then(res => this._parseAnswer(res))
  }

  //Отправляет новую карточку на сервер
  sendNewCard({ newTitlePlace, newLinkPlace }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ //поля в карточке, которые отправляем
        name: newTitlePlace,
        link: newLinkPlace
      })
    }) //В ответ придет объект с новой карточкой
      .then(res => this._parseAnswer(res))
  }

  //Удаляет карточку
  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }) //В ответ придет 200 ОК
      .then(res => this._parseAnswer(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers
    }) //В ответ придет карточка
      .then(res => this._parseAnswer(res))
  }



  //------------ПРО ПРОФИЛЬ--------------------------------
  //Забирает данные пользователя с сервера
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    }) //В ответ придет объект пользователя
      .then(res => this._parseAnswer(res))
  }

  //Отправляет новые данные профиля
  setUserData({ newUserName, newUserAbout }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newUserName,
        about: newUserAbout
      })
    }) //В ответ придет объект с обновленными данными пользователя
      .then(res => this._parseAnswer(res))
  }

  //Обновление аватара
  updateAvatar({ newUserAvatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newUserAvatar
      })
    }) //В ответ придет объект с обновленными данными пользователя
      .then(res => this._parseAnswer(res))
  }
}


const api = new Api(config);

export default api;