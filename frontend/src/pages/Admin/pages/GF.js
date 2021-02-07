import React from "react";
import FilierFrom from "../components/FilierFrom";
import GroupeForm from "../components/GroupeForm";

function GF() {
  return (
    <div className="row gap-10">
      <div className="col-lg-7 col-md-12  component"></div>
      <div className="col-auto"></div>
      <div className="col-lg-4 col-md-12  ">
        <GroupeForm />
        <div className="mt-3"></div>
        <FilierFrom />
      </div>
    </div>
  );
}

export default GF;
