//const baseAuthUrl = 'https://auth.nomoreparties.co';
//const baseAuthUrl = 'http://localhost:3000';

const baseUrl = 'http://mesto.for.students.nomoredomainsclub.ru/api';


const parseAnswer = (res) => {
    if (res.ok) {
        return res.json();
    }
    else Promise.reject(`Ошибка ${res.status}`);
}

export const register = (password, email) => {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password: password,
            email: email
        })
    })
        .then(res => parseAnswer(res))
}

export const authorize = (password, email) => {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password: password,
            email: email
        })
    })
        .then(res => parseAnswer(res))
}

export const checkToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => parseAnswer(res))
}