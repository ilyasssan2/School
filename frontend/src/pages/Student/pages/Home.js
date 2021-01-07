import React from "react";
import Notification from "../components/Notification";
import StudentCard from "../components/StudentCard";

function Home() {
  return (
    <div className="row">
      <div className="col-xl-4 col-lg-7 col-md-7 col-sm-12">
        <StudentCard />
      </div>
      <div className=" col-xl-3 col-lg-5 col-md-5  col-sm-12">
        <Notification />
      </div>
    </div>
  );
}

export default Home;
