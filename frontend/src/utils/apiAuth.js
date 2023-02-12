const baseAuthUrl = 'https://auth.nomoreparties.co';

const parseAnswer = (res) => {
    if (res.ok) {
        return res.json();
    }
    else Promise.reject(`Ошибка ${res.status}`);
}

export const register = (password, email) => {
    return fetch(`${baseAuthUrl}/signup`, {
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
    return fetch(`${baseAuthUrl}/signin`, {
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
    return fetch(`${baseAuthUrl}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => parseAnswer(res))
}