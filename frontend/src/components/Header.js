import React from 'react';
import logo from '../images/logo.svg';
import { Link, Route } from 'react-router-dom';

function Header({
    loggedIn,
    email,
    onExit
}
) {
    return (
        <header className="header">
            <img className="header__logo"
                src={logo}
                alt="Логотип Место Россия"
            />

            <Route exact path="/">
                <div className="header__auth">
                    {loggedIn &&
                        <p className="header__text">{email}</p>
                    }
                    <Link to="/sign-in" className="header__link" onClick={onExit}>
                        Выйти
                    </Link>
                </div>
            </Route>

            <Route path="/sign-in">
                <Link to="/sign-up" className="header__link">
                    Регистрация
                </Link>
            </Route>

            <Route path="/sign-up">
                <Link to="/sign-in" className="header__link">
                    Войти
                </Link>
            </Route>
        </header>
    );
}

export default Header;