import { Input, Select, Form, Alert } from "antd";

import React, { useEffect, useState } from "react";
import useHTTP from "../../../Shared/useHTTP";

function AlertForm({ DataToModel }) {
  const { Option } = Select;
  const [groupes, setGroupes] = useState();
  const { fetchData, error } = useHTTP();
  const [form] = Form.useForm();

  useEffect(() => {
    getGroupes();
  }, []);
  const HandelDelete = async () => {
    const res = await fetchData("student/" + DataToModel._id, "DELETE");
  };
  const getGroupes = async () => {
    const res = await fetchData("group");
    setGroupes(res.groupes);
  };
  const HandelStudent = async (student, handling) => {
    const method = "POST";
    const res = await fetchData("notify", method, JSON.stringify(student), {
      "Content-Type": "application/json",
    });
  };
  const HandelSubmit = (handling = "Add") => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        const data = {
          firstName: values.firstName,
          groupe: DataToModel.groupe ? DataToModel.groupe : values.groupe,
        };

        HandelStudent(data, handling);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <div className="px-3 py-4">
      {error ? (
        <Alert message={error} type="error" className="w-full mb-3" showIcon />
      ) : null}
      <Form className=" " form={form} layout="vertical">
        <Form.Item
          name="title"
          rules={[{ required: true }]}
          initialValue={DataToModel.firstName}
        >
          <Input className="input__text" placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true }]}
          initialValue={DataToModel.lastName}
        >
          <Input className="input__text" placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="groupe"
          rules={[{ required: true }]}
          initialValue={DataToModel.groupe && DataToModel.groupe.name}
        >
          <Select className="input__text" placeholder="Groupe">
            {groupes &&
              groupes.map((groupe) => (
                <Option value={groupe._id} key={groupe._id}>
                  {groupe.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <button onClick={HandelDelete} key="2" className="btn__danger mr-2">
          Delete
        </button>
        <button
          onClick={HandelSubmit.bind(this, "Add")}
          key="2"
          className="btn__primary mr-2"
        >
          Add
        </button>
        ,
      </Form>
    </div>
  );
}

export default AlertForm;
