import { React, useEffect } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { useFormValidation } from '../../hooks/useFormValidation';

function Profile() {
  const {values, handleChange, errors, isValid, resetForm, setValues} = useFormValidation();

  useEffect(() => {
    resetForm();
    setValues({
      name: "Виталий",
      email: "pochta@yandex.ru"
    });
  }, [resetForm, setValues]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
  }

  return(
    <>
      <Header movies={true} />
      <section className="profile">
        <h2 className="profile__header">Привет, Виталий!</h2>
        <form className="form" name="form-profile" onSubmit={handleSubmit} noValidate>
          <fieldset className="form__input-container form__input-container_for_profile">
            <div className="form__wrapper">
              <label className="form__label" htmlFor="name-input">Имя</label>
              <input className="form__item form__item_el_name" value={values.name || ''} onChange={handleChange} type="text" id="name-input" name="name" placeholder="Имя" required minLength="2" maxLength="40"/>
            </div>
            <span className={`form__item-error name-input-error ${errors.name ? "form__item-error_active" : ""}`}>{errors.name}</span>
            <div className="form__wrapper">
              <label className="form__label" htmlFor="name-input">E-mail</label>
              <input className="form__item form__item_el_email" value={values.email || ''} onChange={handleChange} type="email" id="email-input" name="email" placeholder="E-mail" required/>
            </div>
            <span className={`form__item-error emailt-input-error ${errors.email ? "form__item-error_active" : ""}`}>{errors.email}</span>
          </fieldset>
          <button type="submit" className="form__button" value="Редактировать" disabled={!isValid}>Редактировать</button>
        </form>
        <button type="button" className="profile__button" value="Выйти">Выйти из аккаунта</button>
      </section>
    </>
  );
}

export default Profile;
