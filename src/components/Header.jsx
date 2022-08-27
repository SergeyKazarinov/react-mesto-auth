import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/Logo.svg';

function Header({linkTitle, link, onSignOut, email}) {

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className="header__flex">
        <span className="header__email">{email}</span>
        <Link to={link} className="link header__link" onClick={onSignOut}>{linkTitle}</Link>
      </div>
    </header>
  );
}

export default Header;