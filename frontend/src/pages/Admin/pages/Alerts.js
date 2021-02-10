import React from "react";
import AlertForm from "../components/AlertForm";
function Alerts() {
  return (
    <div>
      <div className="row">
        <div className="col-lg-7 col-sm-12 ">
          <div className="col-12 component">
            <h1>Form</h1>
          </div>
        </div>

        <div className="col-lg-5 col-sm-12 ">
          <div className="col-12 component">
            <AlertForm DataToModel={{}} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alerts;
