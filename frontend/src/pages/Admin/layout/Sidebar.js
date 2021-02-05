import React from "react";
import { NavLink } from "react-router-dom";
import {
  House,
  ListUl,
  BoxArrowInLeft,
  Bell,
  People,
  Gear,
  PersonBadge
} from "react-bootstrap-icons";
import { useSelector } from "react-redux";
const Sidebar = ({ logout, toggle }) => {
  const admin = useSelector((state) => state.admin.admin);
  return (
    <div className={toggle ? "min__SideBar SideBar" : "SideBar"}>
      <div className="sidebar__logo"></div>
      <div className="sidebar__top">
        <img src="/assets/images/t1.jpg" className="img__rounded" alt="" />
        <h5>{admin && admin.login}</h5>
        <h6>
          <span>Dashboard</span>-<span>Admin</span>
        </h6>
        <h5 className="sidebar__top__profile">Profile</h5>
      </div>
      <div className="sidebar__menu">
        <ul>
          <li className="sidebar__menu__element">
            <NavLink to="/Admin" activeClassName="active" exact>
              <House className="sidebar__menu__element__icon" />
              Home
            </NavLink>
          </li>{" "}
          <li className="sidebar__menu__element ">
            <NavLink to="/Admin/Alerts" exact activeClassName="active">
              <Bell className="sidebar__menu__element__icon" />
              Alerts
            </NavLink>
          </li>
          <li className="sidebar__menu__element ">
            <NavLink to="/Admin/Groupes" activeClassName="active">
              <ListUl className="sidebar__menu__element__icon" />
              Groupes
            </NavLink>
          </li>
          <li className="sidebar__menu__element ">
            <NavLink to="/Admin/Students" activeClassName="active">
              <People className="sidebar__menu__element__icon" />
              Students
            </NavLink>
          </li>
          <li className="sidebar__menu__element ">
            <NavLink to="/Admin/Teachers" activeClassName="active">
              <PersonBadge className="sidebar__menu__element__icon" />
              Teachers
            </NavLink>
          </li>
          <li className="sidebar__menu__element ">
            <NavLink to="/Admin/Settings" activeClassName="active">
              <Gear className="sidebar__menu__element__icon" />
              Settings
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
