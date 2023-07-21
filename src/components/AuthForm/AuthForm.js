import { React } from 'react';
import './AuthForm.css';
import { Link, useLocation } from 'react-router-dom';

function AuthForm({ children, isValid }) {
  const location = useLocation();
  const text = location.pathname ==="/signup" ?
    {welcome: "Добро пожаловать!", button: "Зарегестрироваться", answer: "Уже зарегистрированы?",
    path: "/signin", action: "Войти"} :
    {welcome: "Рады видеть!", button: "Войти", answer: "Ещё не зарегистрированы?",
    path: "/signup", action: "Регистрация"};

  const handleSubmit = (evt) => {
    evt.preventDefault();
  }

  return(
    <>
      <Link to="/">
        <div className="register__logo"></div>
      </Link>
      <h2 className="register__welcome">{text.welcome}</h2>
      <form onSubmit={handleSubmit} className="register__container">
        <fieldset className="register__input-container">
          {children}
        </fieldset>
        <button type="submit" className="register__button" disabled={!isValid}>{text.button}</button>
      </form>
      <div className="register__signin">
        <p className="register__text">{text.answer}</p>
        <Link to={text.path} className="register__login-link">{text.action}</Link>
      </div>
    </>
  );
}

export default AuthForm;
