import { DatePicker, Input, Modal, Select, Form, Alert } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useHTTP from "../../../Shared/useHTTP";

function PersonneForm({ OpenModal, open }) {
  const { Option } = Select;
  const [groupes, setGroupes] = useState();
  const { fetchData, error } = useHTTP();
  const [form] = Form.useForm();

  useEffect(() => {
    getGroupes();
  }, []);
  const getGroupes = async () => {
    const res = await fetchData("group");
    setGroupes(res.groupes);
  };
  const AddStudent = async (student) => {
    console.log(JSON.stringify(student));
    const res = await fetchData("student", "POST", JSON.stringify(student), {
      "Content-Type": "application/json",
    });
  };
  const HandelSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();

        const data = {
          firstName: values.firstName,
          groupe: values.groupe,
          email: values.email,
          lastName: values.lastName,
          phone: values.phone,
          birthday: moment(values.birthday).format("YYYY-MM-DD"),
        };
        // const dd = new FormData();
        // dd.append("firstName", values.firstName);
        // dd.append("lastName", values.lastName);
        // dd.append("groupe", values.groupe);
        // dd.append("email", values.email);
        // dd.append("birthday", moment(values.birthday).format("YYYY-MM-DD"));
        // dd.append("phone", values.phone);
        AddStudent(data);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Add Students"
      closable={false}
      visible={open}
      onCancel={OpenModal}
      onOk={HandelSubmit}
      centered
      width={600}
      footer={[
        <button key="1" onClick={OpenModal} className="btn__secondary">
          Cancel
        </button>,
        ,
        <button
          type="primary"
          onClick={HandelSubmit}
          key="2"
          className="btn__primary"
        >
          Add
        </button>,
      ]}
    >
      {error ? (
        <Alert message={error} type="error" className="w-full mb-3" showIcon />
      ) : null}
      <Form className="personneForm" form={form} layout="vertical">
        <div className="row ">
          <div className="col-6">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true }]}
            >
              <Input className="input__form" placeholder="First Name" />
            </Form.Item>
          </div>
          <div className="col-6">
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true }]}
            >
              <Input className="input__form" placeholder="Last Name" />
            </Form.Item>
          </div>
        </div>
        <div className="row ">
          <div className="col-6">
            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
              <Input className="input__form" placeholder="Phone" />
            </Form.Item>
          </div>
          <div className="col-6">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input className="input__form" placeholder="Email" />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <Form.Item
              name="birthday"
              label="Birthday"
              rules={[{ required: true }]}
            >
              <DatePicker className="input__form" />
            </Form.Item>
          </div>
          <div className="col-4 ">
            <Form.Item
              label="Groupe"
              name="groupe"
              rules={[{ required: true }]}
            >
              <Select className="input__form" placeholder="Groupe">
                {groupes &&
                  groupes.map((groupe) => (
                    <Option value={groupe._id} key={groupe._id}>
                      {groupe.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default PersonneForm;
