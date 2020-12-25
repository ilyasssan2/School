import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./Styles/index.scss";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import { useSelector } from "react-redux";
import useAuth from "../../Shared/useAuth";
const Home = React.lazy(() => import("./pages/Home"));
const Notifications = React.lazy(() => import("./pages/Notifications"));
let timer;
function App() {
  const token = useSelector((state) => state.student.token);
  const auth = useAuth();
  const history = useHistory();
  useEffect(() => {
    if (!token) {
      timer = setTimeout(() => {
        console.log("Going to login");
        history.push("/Login");
      }, 2000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [token]);

  const [toggle, setToggle] = useState(false);

  return (
    <div className="Student__area">
      <Header toggle={toggle} setToggle={setToggle} />
      <Sidebar logout={auth.logout} toggle={toggle} />
      <div className={toggle ? " full__content content" : "content"}>
        <Switch>
          <Route path="/Student" component={Home} exact />
          <Route path="/Student/Notifications/:id?" component={Notifications} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
