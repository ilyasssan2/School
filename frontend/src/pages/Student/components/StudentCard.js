import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
function StudentCard() {
  const student = useSelector((state) => state.student.student);
  console.log(student);
  if (!student) return null;
  return (
    <div className="myShadow p-4 bg-white StudentCard component">
      <div className="d-flex align-items-center">
        <img
          src="/assets/images/t1.jpg"
          className="img__rounded student__img"
          alt=""
        />
        <div className="ml-3">
          <h5 className="m-0">
            {student.firstName} <br /> {student.lastName}
          </h5>
        </div>
      </div>
      <div className="StudentCard__info">
        <p>
          Email :<span>{student.email && student.email}</span>
        </p>
        <p>
          {" "}
          Group :<span>
            {student.groupe.name ? student.groupe.name : ""}
          </span>{" "}
        </p>
        <p>
          {" "}
          Phone :<span>{student.phone ? student.phone : ""}</span>{" "}
        </p>
        <p>
          {" "}
          Birthday :
          <span>
            {student.birthday ? moment(student.birthday).calendar() : ""}
          </span>{" "}
        </p>
        <p>
          {" "}
          Year :
          <span>
            {student.groupe
              ? new Date(student.groupe.createdAt).getFullYear()
              : ""}
          </span>{" "}
        </p>
      </div>
    </div>
  );
}

export default StudentCard;
