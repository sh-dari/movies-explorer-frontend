import { React, useEffect } from 'react';
import './Login.css';
import { useFormValidation } from '../../hooks/useFormValidation';
import AuthForm from '../AuthForm/AuthForm';

function Login() {
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
    <section className="login">
      <AuthForm isValid={isValid}>
        <div className="register__wrapper">
          <label className="register__label" for="email-input">E-mail</label>
          <input className="register__item" type="email" id="email" name="email" placeholder="" value={values.email} onChange={handleChange} />
          <span className={`register__item-error email-input-error ${errors.email ? "register__item-error_active" : ""}`}>{errors.email}</span>
        </div>
        <div className="register__wrapper">
          <label className="register__label" for="password-input">Пароль</label>
          <input className="register__item register__item_for_password" type="password" id="password" name="password" placeholder="" value={values.password} onChange={handleChange} />
          <span className={`register__item-error password-input-error ${errors.password ? "register__item-error_active" : ""}`}>{errors.password}</span>
        </div>
      </AuthForm>
    </section>
  );
}

export default Login;
