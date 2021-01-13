import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to="/Login">Go To Student area</Link>
      <br />
      <Link to="/Admin">Go To Admin area</Link>
    </div>
  );
}

export default Home;
