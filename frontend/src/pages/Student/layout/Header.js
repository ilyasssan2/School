import React from "react";
import { useSelector } from "react-redux";

function Header() {
  const Student = useSelector((state) => state.student.student);

  return (
    <header className="header">
      <ul>
        <li className="header__elements">
          <img src="./assets/images/t1.jpg" className="img__rounded" alt="" />{" "}
          <span>{Student && Student.firstName + " " + Student.lastName}</span>
        </li>
      </ul>
    </header>
  );
}

export default Header;
