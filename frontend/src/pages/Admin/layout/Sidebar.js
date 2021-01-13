import React from "react";
import { NavLink } from "react-router-dom";
import {
  HouseFill,
  CardChecklist,
  BoxArrowInLeft,
  PersonLinesFill,
  BellFill,
  CalendarXFill,
} from "react-bootstrap-icons";
const Sidebar = ({ logout, toggle }) => {
  return (
    <div className={toggle ? "min__SideBar SideBar" : "SideBar"}>
      <div className="sidebar__top"></div>
      <div className="sidebar__menu">
        <ul>
          <li className="sidebar__menu__element">
            <NavLink to="/Admin" activeClassName="active" exact>
              <HouseFill className="sidebar__menu__element__icon" />
              Home
            </NavLink>
          </li>{" "}
          <li className="sidebar__menu__element ">
            <NavLink to="/Admin/Alerts" exact activeClassName="active">
              <BellFill className="sidebar__menu__element__icon" />
              Alerts
            </NavLink>
          </li>
          <li className="sidebar__menu__element ">
            <NavLink to="/Admin/Groupes" activeClassName="active">
              <CardChecklist className="sidebar__menu__element__icon" />
              Groupes
            </NavLink>
          </li>
          <li className="sidebar__menu__element ">
            <NavLink to="/Admin/Students" activeClassName="active">
              <PersonLinesFill className="sidebar__menu__element__icon" />
              Students
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
