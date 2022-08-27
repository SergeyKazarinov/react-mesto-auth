import React from "react";
import Header from "./Header";
import SignUp from "./SignUp";

const Login = ({onLogIn}) => {
  return(
    <>
      <Header linkTitle="Регистрация" link="/sign-up"/>
      <SignUp title="Вход" titleBtn="Войти" isLogin={true} onSubmit={onLogIn} />
    </>
  )
}

export default Login;