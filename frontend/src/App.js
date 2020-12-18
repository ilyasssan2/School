import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const Home = React.lazy(() => import("./pages/Home"));
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Suspense fallback={"Loading..."}>
            <Route component={Home} path="/" exact />
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
