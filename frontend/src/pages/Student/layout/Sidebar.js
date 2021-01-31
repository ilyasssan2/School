import React from "react";
import { NavLink } from "react-router-dom";
import {
  House,
  ListUl,
  BoxArrowInLeft,
  People,
  Calendar,
} from "react-bootstrap-icons";
import { useSelector } from "react-redux";
const Sidebar = ({ logout, toggle }) => {
  const Student = useSelector((state) => state.student.student);
  return (
    <div className={toggle ? "min__SideBar SideBar" : "SideBar"}>
      <div className="sidebar__logo"></div>
      <div className="sidebar__top">
        <img src="/assets/images/t1.jpg" className="img__rounded" alt="" />
        <h5>{Student && `${Student.firstName} ${Student.lastName} `}</h5>
        <h6>
          <span>Dashboard</span>-<span>Student</span>
        </h6>
        <h5 className="sidebar__top__profile">Profile</h5>
      </div>
      <div className="sidebar__menu">
        <ul>
          <li className="sidebar__menu__element">
            <NavLink to="/Student" activeClassName="active" exact>
              <House className="sidebar__menu__element__icon" />
              Home
            </NavLink>
          </li>
          <li className="sidebar__menu__element ">
            <NavLink to="/Student/Calendar" activeClassName="active">
              <Calendar className="sidebar__menu__element__icon" />
              Calendar
            </NavLink>
          </li>
          <li className="sidebar__menu__element ">
            <NavLink to="/Student/Notes" activeClassName="active">
              <ListUl className="sidebar__menu__element__icon" />
              Notes
            </NavLink>
          </li>
          <li className="sidebar__menu__element ">
            <NavLink to="/Student/Profile" activeClassName="active">
              <People className="sidebar__menu__element__icon" />
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
