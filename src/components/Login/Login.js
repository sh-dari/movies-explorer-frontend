import { React, useEffect, useState } from 'react';
import './Login.css';
import { useFormValidation } from '../../hooks/useFormValidation';
import AuthForm from '../AuthForm/AuthForm';

function Login({ handleAuthorize }) {
  const { values, handleChange, errors, isValid, resetForm, setIsValid } = useFormValidation();
  const [networkErrors, setNetworkErrors] = useState("");

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsValid(false);
    handleAuthorize({
      password: values.password,
      email: values.email
    })
    .catch(err => setNetworkErrors(err.message));
  };

  return(
    <main className="register login">
      <AuthForm isValid={isValid} login={true} handleSubmit={handleSubmit} networkErrors={networkErrors}>
        <div className="register__wrapper">
          <label className="register__label" htmlFor="email">E-mail</label>
          <input className="register__item" type="email" id="email" name="email" placeholder="Почта"
          required value={values.email || ""} onChange={handleChange} pattern="[^@\s]+@[^@\s]+\.[^@\s]+" />
          <span className={`register__item-error email-input-error ${errors.email ? "register__item-error_active" : ""}`}>{errors.email}</span>
        </div>
        <div className="register__wrapper">
          <label className="register__label" htmlFor="password">Пароль</label>
          <input className="register__item register__item_for_password" type="password" id="password" name="password" placeholder="E-mail"
          required value={values.password || ""} onChange={handleChange} minLength="5" maxLength="30" />
          <span className={`register__item-error password-input-error ${errors.password ? "register__item-error_active" : ""}`}>{errors.password}</span>
        </div>
      </AuthForm>
    </main>
  );
}

export default Login;
