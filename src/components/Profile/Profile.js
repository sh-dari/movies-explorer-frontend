import { React, useEffect, useContext } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { useFormValidation } from '../../hooks/useFormValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { LoginContext } from '../../contexts/LoginContext';

function Profile() {
  const { values, handleChange, errors, isValid, resetForm, setValues } = useFormValidation();
  const user = useContext(CurrentUserContext);
  const { handleLogout } = useContext(LoginContext);

  useEffect(() => {
    resetForm();
    setValues({
      name: user.name,
      email: user.email
    });
  }, [resetForm, setValues, user]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
  }

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
                <input className="form__item form__item_el_name" value={values.name || user.name || ''} onChange={handleChange} type="text" id="name-input" name="name" placeholder="Имя" required minLength="2" maxLength="40"/>
              </div>
              <span className={`form__item-error name-input-error ${errors.name ? "form__item-error_active" : ""}`}>{errors.name}</span>
              <div className="form__wrapper">
                <label className="form__label" htmlFor="name-input">E-mail</label>
                <input className="form__item form__item_el_email" value={values.email || user.email || ''} onChange={handleChange} type="email" id="email-input" name="email" placeholder="E-mail" required/>
              </div>
              <span className={`form__item-error emailt-input-error ${errors.email ? "form__item-error_active" : ""}`}>{errors.email}</span>
            </fieldset>
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
