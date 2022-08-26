import React from "react";
import FieldSet from "./Fieldset";
import Header from "./Header";
import SingIn from "./SingIn";

const Register = () => {
  return(
    <>
    <Header />
    <SingIn title="Регистрация" isValid={true} titleBtn="Зарегистрироваться"/>
    </>
  )
}

export default Register;