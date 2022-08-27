import React, { useRef } from "react";
import { Link } from "react-router-dom";
import FieldSet from "./Fieldset";


const SignUp = ({title, isValid, titleBtn, isLogin, onSubmit }) => {
  const userEmail = useRef();
  const userPassword = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      email: userEmail.current.value,
      password: userPassword.current.value
    })
  }

  return(
    <div className="sign-up__container">
      <h2 className="form__title">{title}</h2>
      <form className="form form__page" name="sing-in" onSubmit={handleSubmit}>
        <FieldSet 
          inputType="email"
          inputClassType="registration"
          placeholder="Email"
          id="input-email"
          minLength="2"
          maxLength="40"
          inputRef={userEmail}
        />

        <FieldSet 
          inputType="password"
          inputClassType="registration"
          placeholder="Пароль"
          id="input-password"
          minLength="8"
          maxLength="50"
          inputRef={userPassword}
        />
        <button
          className={`button button_type_authorization ${!isValid && "button_inactive"} ${isLogin && "button_type_login"}`}
          value={titleBtn}
          id="button-save"
          disabled={!isValid ? true : false}
        >
          {titleBtn}
        </button>
        {!isLogin && <p className="sign-up__description">Уже зарегистрированы? <Link to="/sign-in" className="link">Войти</Link></p>}
      </form>
    </div>
  )
}

export default SignUp;