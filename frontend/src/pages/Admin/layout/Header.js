import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  BellFill,
  TextIndentLeft,
  TextIndentRight,
} from "react-bootstrap-icons";
function Header({ setToggle, toggle }) {
  const admin = useSelector((state) => state.admin.admin);

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
            <BellFill className="header__element__icon" />
          </NavLink>
        </li>

        <li className="header__element">
          <img src="/assets/images/t1.jpg" className="img__rounded" alt="" />{" "}
          <span>Hello</span>
          <span>{admin && admin.login}</span>
        </li>
      </ul>
    </header>
  );
}

export default Header;
