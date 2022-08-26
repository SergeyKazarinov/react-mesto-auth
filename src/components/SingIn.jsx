import React from "react";
import FieldSet from "./Fieldset";

const SingIn = ({title, isValid, titleBtn}) => {
  return(
    <div className="sign-up__container">
      <h2 className="form__title">{title}</h2>
      <form className="form form__page" name="sing-in">
        <FieldSet 
          inputType="email"
          inputClassType="registration"
          placeholder="Email"
          id="input-email"
          minLength="2"
          maxLength="40"
        />

        <FieldSet 
          inputType="password"
          inputClassType="registration"
          placeholder="Пароль"
          id="input-password"
          minLength="8"
          maxLength="50"
        />
        <button
          className={`button button_type_authorization ${
            !isValid && "button_inactive"
          }`}
          value={titleBtn}
          id="button-save"
          disabled={!isValid ? true : false}
        >
          {titleBtn}
        </button>
        <p className="sign-up__description">Уже зарегистрированы? <a className="sign-up__link" href="#">Войти</a></p>
      </form>
    </div>
  )
}

export default SingIn;