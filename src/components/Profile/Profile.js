import { React, useState, useContext, useEffect } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { useFormValidation } from '../../hooks/useFormValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { LoginContext } from '../../contexts/LoginContext';

function Profile({ handleUpdateUser }) {
  const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useFormValidation();
  const user = useContext(CurrentUserContext);
  const { handleLogout } = useContext(LoginContext);
  const [networkErrors, setNetworkErrors] = useState("");

  useEffect(() => {
    resetForm();
    setValues({
      name: user.name,
      email: user.email
    });
    setNetworkErrors("");
  }, [resetForm, setValues, user]);

  useEffect(() => {
    if (user.name === values.name && user.email === values.email) {
      setIsValid(false);
    }
  }, [values]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleUpdateUser({
      name: values.name.trimStart(),
      email: values.email
    })
    .catch(err => setNetworkErrors(err.message));
  };

  return(
    <>
      <Header movies={true} />
      <main className="profile">
        <section>
          <h1 className="profile__header">{`Привет, ${user.name}`}</h1>
          <form className="form" name="form-profile" onSubmit={handleSubmit} noValidate>
            <fieldset className="form__input-container form__input-container_for_profile">
              <div className="form__wrapper">
                <label className="form__label" htmlFor="name-input">Имя</label>
                <input className="form__item" type="text" id="name" name="name" placeholder="Имя (только буквы, пробел или дефис)" value={values.name || ""}
                onChange={handleChange} required pattern="[а-яА-ЯёЁa-zA-Z\s\-]{2,40}" />
              </div>
              <span className={`form__item-error name-input-error ${errors.name ? "form__item-error_active" : ""}`}>{errors.name}</span>
              <div className="form__wrapper">
                <label className="form__label" htmlFor="name-input">E-mail</label>
                <input className="form__item" type="email" id="email" name="email" placeholder="Почта"
                required value={values.email || ""} onChange={handleChange} pattern="[^@\s]+@[^@\s]+\.[^@\s]+" />
              </div>
              <span className={`form__item-error emailt-input-error ${errors.email ? "form__item-error_active" : ""}`}>{errors.email}</span>
            </fieldset>
            <span className={`form__item-errors`}>{networkErrors}</span>
            <button type="submit" className="form__button" value="Редактировать" disabled={!isValid}>Редактировать</button>
          </form>
          <button className="profile__button" onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        </section>
      </main>
    </>
  );
}

export default Profile;
