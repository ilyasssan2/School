import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./layout/Sidebar";
import "../../styles/Student/index.scss";
import Header from "./layout/Header";
import { useSelector } from "react-redux";
import useAuth from "../../Shared/useAuth";

function App() {
  const token = useSelector((state) => state.student.token);
  const auth = useAuth();
  const history = useHistory();
  useEffect(() => {
    if (!token) {
      history.push("/Login");
    }
  }, [token]);
  return (
    <div className="Student__area">
      <Header />
      <Sidebar logout={auth.logout} />
      <div className="content">
        <BrowserRouter basename="/Student">
          <Switch>
            <Route path="/" component={Home} exact />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
