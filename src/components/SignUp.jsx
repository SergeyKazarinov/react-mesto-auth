import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FieldSet from "./Fieldset";


const SignUp = ({title, titleBtn, isLogin, onSubmit }) => {
  const userEmail = useRef();
  const userPassword = useRef();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isButtonValid, setIsButtonValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      email: userEmail.current.value,
      password: userPassword.current.value
    })
  }

  function handleEmailChange() {
    if(userEmail.current.validity.valid) {
      setIsEmailValid(true);
    }
    else {
      setIsEmailValid(false);
    }
  }

  function handlePasswordChange() {
    if(userPassword.current.validity.valid) {
      setIsPasswordValid(true);
    }
    else {
      setIsPasswordValid(false);
    }
  }

  useEffect(() => {
    setIsButtonValid(isEmailValid && isPasswordValid);
}, [isEmailValid, isPasswordValid])

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
          onChange={handleEmailChange}
        />

        <FieldSet 
          inputType="password"
          inputClassType="registration"
          placeholder="Пароль"
          id="input-password"
          minLength="8"
          maxLength="50"
          inputRef={userPassword}
          onChange={handlePasswordChange}
        />
        <button
          className={`button button_type_authorization ${!isButtonValid && "button_inactive"} ${isLogin && "button_type_login"}`}
          value={titleBtn}
          id="button-save"
          disabled={!isButtonValid ? true : false}
        >
          {titleBtn}
        </button>
        {!isLogin && <p className="sign-up__description">Уже зарегистрированы? <Link to="/sign-in" className="link">Войти</Link></p>}
      </form>
    </div>
  )
}

export default SignUp;