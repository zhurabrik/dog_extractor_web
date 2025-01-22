import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">🎨 MyCollage</div>
      <div className="auth-buttons">
        <button className="btn-login">Войти</button>
        <button className="btn-signup">Регистрация</button>
      </div>
    </header>
  );
};

export default Header;