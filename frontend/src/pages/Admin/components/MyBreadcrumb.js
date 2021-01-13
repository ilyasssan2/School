import React from "react";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";

function MyBreadcrumb() {
  return (
    <div className="mb-3">
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/Admin" exact activeClassName="active__bread">
            <span>Home</span>
          </NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/Admin/Students" exact activeClassName="active__bread">
            <span>Students</span>
          </NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default MyBreadcrumb;
