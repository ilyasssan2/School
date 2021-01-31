import React from "react";
import { NavLink } from "react-router-dom";
import { Bell, TextIndentLeft, TextIndentRight } from "react-bootstrap-icons";
function Header({ setToggle, toggle }) {
  const toggeleSidebare = () => {
    setToggle(!toggle);
  };
  return (
    <header className={toggle ? " full__header header" : "header"}>
      {toggle ? (
        <TextIndentLeft
          onClick={toggeleSidebare}
          className="ico__toggele"
          size={26}
        />
      ) : (
        <TextIndentRight
          onClick={toggeleSidebare}
          className="ico__toggele"
          size={26}
        />
      )}
      <ul className="header__elements">
        <li className="header__element ">
          <NavLink to="/Student/Notifications" activeClassName="active">
            <Bell className="header__element__icon" />
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
