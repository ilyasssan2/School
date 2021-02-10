import { useFormik } from "formik";
import React from "react";
import useHTTP from "../../../Shared/useHTTP";
import { PlusCircleFill } from "react-bootstrap-icons";
import { Input } from "antd";
function FilierFrom() {
  const formik = useFormik({
    initialValues: { name: "" },
    onSubmit: async ({ name }, { resetForm }) => {
      await fetchData("filier", "POST", JSON.stringify({ name }), {
        "Content-Type": "application/json",
      });

      resetForm();
    },
  });
  const { fetchData } = useHTTP();

  return (
    <div className="component p-3 ">
      <div className="mx-2 component__icon  ">
        <PlusCircleFill size={28} />
      </div>

      <form onSubmit={formik.handleSubmit} className="personneForm">
        <Input
          className="input__form mb-2"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          placeholder="Name"
        />

        <button className="btn__form w-100">Add</button>
      </form>
    </div>
  );
}

export default FilierFrom;
