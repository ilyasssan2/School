import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import useHTTP from "../../../Shared/useHTTP";
import { Input, message, Select } from "antd";
import { PlusCircleFill } from "react-bootstrap-icons";
function GroupeForm() {
  const [filiers, setFiliers] = useState();
  const formik = useFormik({
    initialValues: { name: "", filier: "" },
    onSubmit: async (values, { resetForm }) => {
      const { name, filier } = values;
      const data = await fetchData(
        "group",
        "POST",
        JSON.stringify({ name, filier }),
        {
          "Content-Type": "application/json",
        }
      );
      message.success(data.message);
      resetForm();
    },
  });
  const { Option } = Select;
  const { fetchData } = useHTTP();
  const getFiliers = async () => {
    const data = await fetchData("filier");
    setFiliers(data.filiers);
  };
  useEffect(() => {
    getFiliers();
  }, []);

  return (
    <div className="component p-3">
      <div className="mx-2 component__icon  ">
        <PlusCircleFill size={28} />
      </div>
      <form onSubmit={formik.handleSubmit} className="personneForm">
        <div className="d-flex mb-2">
          <Input
            className="input__form mr-1"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Name"
          />
          <Select
            className="input__form "
            placeholder="filier name"
            name="filier"
            onChange={(value) => formik.setFieldValue("filier", value)}
          >
            {filiers &&
              filiers.map((filier) => (
                <Option value={filier._id} key={filier._id}>
                  {filier.name}
                </Option>
              ))}
          </Select>
        </div>
        <button className="btn__form w-100">Add</button>
      </form>
    </div>
  );
}

export default GroupeForm;
