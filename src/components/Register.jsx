import React from "react";
import Header from "./Header";
import SignUp from "./SignUp";

const Register = ({onRegistration}) => {

  return(
    <>
      <Header linkTitle="Войти" link="/sign-in"/>
      <SignUp title="Регистрация" titleBtn="Зарегистрироваться" isLogin={false} onSubmit={onRegistration} />
    </>
  )
}

export default Register;