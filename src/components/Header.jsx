import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/Logo.svg';

function Header({linkTitle, link}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <Link to={link} className="link header__link">{linkTitle}</Link>
    </header>
  );
}

export default Header;