import React from "react";
import Notification from "../components/Notification";
import StudentCard from "../components/StudentCard";

function Home() {
  return (
    <div className="row">
      <div className="col-lg-8 col-sm-12">
        <StudentCard />
      </div>
      <div className="col-lg-4  col-sm-12">
        <Notification />
      </div>
    </div>
  );
}

export default Home;
