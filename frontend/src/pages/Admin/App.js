import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "../../styles/DashBoard/index.scss";

import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import { useSelector } from "react-redux";
import useAdmin from "../../Shared/useAdmin";
import MyBreadcrumb from "./components/MyBreadcrumb";
const Home = React.lazy(() => import("./pages/Home"));
const Students = React.lazy(() => import("./pages/Students"));
let timer;
function App() {
  const token = useSelector((state) => state.admin.token);
  document.title = "Admin";
  const admin = useAdmin();
  const history = useHistory();
  useEffect(() => {
    if (!token) {
      timer = setTimeout(() => {
        console.log("Going to login");
        history.push("/AdminLogin");
      }, 100);
      return () => {
        clearInterval(timer);
      };
    }
  }, [token]);
  const [toggle, setToggle] = useState();
  const sidebar = JSON.parse(localStorage.getItem("Sidebare"))
  useEffect(()=>{
if(sidebar) {setToggle(sidebar["value"])}
  },[])
  return (
    <div className="Student__area">
      <Header toggle={toggle} setToggle={setToggle} />
      <Sidebar logout={admin.logout} toggle={toggle} />
      <div className={toggle ? " full__content content" : "content"}>
        <MyBreadcrumb />
        <Switch>
          <Route path="/Admin" component={Home} exact />
          <Route path="/Admin/Students" component={Students} exact />
        </Switch>
      </div>
    </div>
  );
}

export default App;
