import React from "react";
import { NavLink } from "react-router-dom";
import {
  HouseFill,
  CardChecklist,
  BoxArrowInLeft,
  PersonLinesFill,
} from "react-bootstrap-icons";

const Sidebar = ({ logout }) => {
  return (
    <div className="SideBar">
      <div className="sidebar__top"></div>
      <div className="sidebar__menu">
        <ul>
          <li className="sidebar__menu__element">
            <NavLink to="/Student" activeClassName="active" exact>
              <HouseFill className="sidebar__menu__element__icon" />
              Home
            </NavLink>
          </li>
          <li className="sidebar__menu__element ">
            <NavLink to="/Student/Notes" activeClassName="active">
              <CardChecklist className="sidebar__menu__element__icon" />
              Notes
            </NavLink>
          </li>
          <li className="sidebar__menu__element ">
            <NavLink to="/Student/Profile" activeClassName="active">
              <PersonLinesFill className="sidebar__menu__element__icon" />
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="sidebar__bottom" onClick={logout}>
        <BoxArrowInLeft size={34} />
        Logout
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
