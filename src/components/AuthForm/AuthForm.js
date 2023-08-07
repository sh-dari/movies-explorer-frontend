import { React } from 'react';
import './AuthForm.css';
import { Link, useLocation } from 'react-router-dom';

function AuthForm({ children, isValid, login, handleSubmit, networkErrors }) {
  const location = useLocation();
  const text = location.pathname ==="/signup" ?
    {welcome: "Добро пожаловать!", button: "Зарегестрироваться", answer: "Уже зарегистрированы?",
    path: "/signin", action: "Войти"} :
    {welcome: "Рады видеть!", button: "Войти", answer: "Ещё не зарегистрированы?",
    path: "/signup", action: "Регистрация"};

  return(
    <>
      <Link to="/">
        <div className="register__logo"></div>
      </Link>
      <section className="register__section">
        <h1 className="register__welcome">{text.welcome}</h1>
        <form onSubmit={handleSubmit} className={`register__container ${login ? "login__container" : ""}`}>
          <fieldset className="register__input-container">
            {children}
          </fieldset>
          <div>
            <span className={`register__item-errors`}>{networkErrors}</span>
            <button type="submit" className="register__button" disabled={!isValid}>{text.button}</button>
          </div>
        </form>
      </section>
      <div className="register__signin">
        <p className="register__text">{text.answer}</p>
        <Link to={text.path} className="register__login-link">{text.action}</Link>
      </div>
    </>
  );
}

export default AuthForm;
