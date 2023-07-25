import { React, useEffect } from 'react';
import './Register.css';
import { useFormValidation } from '../../hooks/useFormValidation';
import AuthForm from '../AuthForm/AuthForm';

function Register() {
  const {values, handleChange, errors, isValid, resetForm, setValues} = useFormValidation();

  useEffect(() => {
    resetForm();
    setValues({
      name: "",
      email: "",
      password: ""
    });
  }, [resetForm, setValues]);

  return(
    <main className="register">
      <AuthForm isValid={isValid}>
        <div className="register__wrapper">
          <label className="register__label" htmlFor="name">Имя</label>
          <input className="register__item" type="text" id="name" name="name" placeholder="Имя" value={values.name || ""} onChange={handleChange} required minLength="2" maxLength="40" />
          <span className={`register__item-error name-input-error ${errors.name ? "register__item-error_active" : ""}`}>{errors.name}</span>
        </div>
        <div className="register__wrapper">
          <label className="register__label" htmlFor="email">E-mail</label>
          <input className="register__item" type="email" id="email" name="email" placeholder="E-mail" value={values.email || ""} onChange={handleChange} />
          <span className={`register__item-error email-input-error ${errors.email ? "register__item-error_active" : ""}`}>{errors.email}</span>
        </div>
        <div className="register__wrapper">
          <label className="register__label" htmlFor="password">Пароль</label>
          <input className="register__item register__item_for_password" type="password" id="password" name="password" placeholder="Пароль" value={values.password || ""} onChange={handleChange} minLength="5" maxLength="30" />
          <span className={`register__item-error password-input-error ${errors.password ? "register__item-error_active" : ""}`}>{errors.password}</span>
        </div>
      </AuthForm>
    </main>
  );
}

export default Register;
