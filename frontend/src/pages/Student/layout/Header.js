import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TextIndentLeft, TextIndentRight } from "react-bootstrap-icons";
function Header({ setToggle, toggle }) {
  const Student = useSelector((state) => state.student.student);

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
      <ul>
        <li className="header__elements">
          <img src="/assets/images/t1.jpg" className="img__rounded" alt="" />{" "}
          <span>{Student && Student.firstName + " " + Student.lastName}</span>
        </li>
      </ul>
    </header>
  );
}

export default Header;
