import React from "react";
import FilierFrom from "../components/FilierFrom";
import GroupeForm from "../components/GroupeForm";
import GroupesTable from "../components/GroupesTable";
import Statistics from "../components/Statistics";

function GF() {
  return (
    <div className="row ">
      <div className="col-lg-7 col-md-12 p-3  component">
        <div className="row">
          <div className="col-12">
            <Statistics />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <GroupesTable />
          </div>
        </div>
      </div>
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
