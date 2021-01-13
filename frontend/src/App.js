import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.scss";
import "antd/dist/antd.css";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./Store/root";
import MySpin from "./UI/Spin";
const Home = React.lazy(() => import("./pages/Home"));
const AdminLogin = React.lazy(() => import("./pages/AdminLogin"));
const Student = React.lazy(() => import("./pages/Student/App"));
const Admin = React.lazy(() => import("./pages/Admin/App"));

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Suspense fallback={<MySpin />}>
              <Route component={Home} path="/" exact />
              <Route path="/Login" component={Login} exact />
              <Route path="/AdminLogin" component={AdminLogin} exact />
              <Route component={Student} path="/Student" />
              <Route component={Admin} path="/Admin" />
            </Suspense>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
