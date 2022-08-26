import React from "react";
import Header from "./Header";
import SignUp from "./SignUp";

const Register = () => {
  return(
    <>
      <Header linkTitle="Войти" link="/sign-in"/>
      <SignUp title="Регистрация" isValid={true} titleBtn="Зарегистрироваться" isLogin={false}/>
    </>
  )
}

export default Register;