import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./Store/root";
const Home = React.lazy(() => import("./pages/Home"));

const Student = React.lazy(() => import("./pages/Student/App"));
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Suspense fallback={"Loading..."}>
              <Route component={Home} path="/" exact />
              <Route path="/Login" component={Login} exact />
              <Route component={Student} path="/Student" />
            </Suspense>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
