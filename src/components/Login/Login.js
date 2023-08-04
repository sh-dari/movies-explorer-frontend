import { React, useEffect } from 'react';
import './Login.css';
import { useFormValidation } from '../../hooks/useFormValidation';
import AuthForm from '../AuthForm/AuthForm';

function Login({ handleAuthorize }) {
  const {values, handleChange, errors, isValid, resetForm} = useFormValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAuthorize({
      password: values.password,
      email: values.email
    });
  };

  return(
    <main className="register login">
      <AuthForm isValid={isValid} login={true} handleSubmit={handleSubmit}>
        <div className="register__wrapper">
          <label className="register__label" htmlFor="email">E-mail</label>
          <input className="register__item" type="email" id="email" name="email" placeholder="Почта"
          required value={values.email || ""} onChange={handleChange} />
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
