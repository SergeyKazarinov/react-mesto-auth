import React from "react";
import Header from "./Header";
import SignUp from "./SignUp";

const Login = () => {
  return(
    <>
      <Header linkTitle="Регистрация" link="/sign-up"/>
      <SignUp title="Вход" isValid={true} titleBtn="Войти" isLogin={true}/>
    </>
  )
}

export default Login;