import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.svg';
import Header from "./Header";

function Register({
  onRegister,
  onSubmit
}) {
  const [inputData, setInputData] = React.useState({ password: '', email: '' });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setInputData(old => ({
      ...old,
      [name]: value
    }));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const { password, email } = inputData;
    if (!password || !email) return;
    onRegister(password, email);
  }

  return (
    <>
      <Header />
      <main>
        <section className="register">
          <div className="register__container">
            <h2 className="register__title">
              Регистрация
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                id="register_email_input"
                className="register__input register__input_email"
                placeholder="Email"
                required
                value={inputData.email || ''}
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                id="register_password_input"
                className="register__input register__input_password"
                placeholder="Пароль"
                required
                value={inputData.password || ''}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="register__register-button">
                Зарегистрироваться
              </button>
            </form>
          </div>
          <p className="register__link-container">
            <Link to="/sign-in" className="register__link">
              Уже зарегистрированы? Войти
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}

export default Register;