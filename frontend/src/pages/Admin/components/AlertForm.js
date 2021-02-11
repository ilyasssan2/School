import { DatePicker, Input, Modal, Select, Form, Alert } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useHTTP from "../../../Shared/useHTTP";

function AlertForm({ OpenModal, open, DataToModel }) {
  const { Option } = Select;
  const [groupes, setGroupes] = useState();
  const { fetchData, error } = useHTTP();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  useEffect(() => {
    getGroupes();
  }, []);
  const HandelDelete = async () => {
    const res = await fetchData("student/" + DataToModel._id, "DELETE");
    OpenModal();
  };
  const getGroupes = async () => {
    const res = await fetchData("group");
    setGroupes(res.groupes);
  };
  const HandelNotify = async (n) => {
    await fetchData("notification", "POST", JSON.stringify(n), {
      "Content-Type": "application/json",
    });
  };
  const HandelSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        form.resetFields();
        const groups = values.groups.join(",");
        const data = {
          title: values.title,
          groups,
          message: values.message,
        };
        HandelNotify(data);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Add Notifacation"
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
        DataToModel._id
          ? [
              <button onClick={HandelDelete} key="2" className="btn__danger">
                Delete
              </button>,
            ]
          : [
              <button
                onClick={HandelSubmit.bind(this, "Add")}
                key="2"
                className="btn__primary"
              >
                Add
              </button>,
            ],
      ]}
    >
      {error ? (
        <Alert message={error} type="error" className="w-full mb-3" showIcon />
      ) : null}
      <Form className="personneForm" form={form} layout="vertical">
        <div className="row ">
          <div className="col-12">
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true }]}
              initialValue={DataToModel.title}
            >
              <Input className="input__form" placeholder="title" />
            </Form.Item>
          </div>
        </div>
        <div className="row ">
          <div className="col-12">
            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true }]}
              initialValue={DataToModel.message}
            >
              <TextArea className="textArea__form" placeholder="Message" />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Form.Item
              name="groups"
              label="Groups"
              initialValue={DataToModel.groups && moment(DataToModel.groups)}
            >
              <Select
                mode="multiple"
                placeholder="Select Groups"
                style={{ width: "100%" }}
              >
                {groupes &&
                  groupes.map((item) => (
                    <Select.Option key={item._id} value={item._id}>
                      {item.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default AlertForm;
