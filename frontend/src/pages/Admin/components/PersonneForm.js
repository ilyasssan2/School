import { DatePicker, Input, Modal, Select, Form, Alert  , message} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useHTTP from "../../../Shared/useHTTP";

function PersonneForm({ OpenModal, open , DataToModel }) {
  const { Option } = Select;
  const [groupes, setGroupes] = useState();
  const { fetchData, error  } = useHTTP();
  const [form] = Form.useForm();
  
  useEffect(() => {
    getGroupes();
  }, []);
  const HandelDelete = async ()=>{
    const res = await fetchData("student/"+DataToModel._id , "DELETE");
    message.success(res.message);
   OpenModal()
  }
  const getGroupes = async () => {
    const res = await fetchData("group");
    setGroupes(res.groupes);
  };
  const HandelStudent = async (student , handling ) => {
    const method = handling  === "Add" ? "POST" : "PATCH" 
    const res = await fetchData("student", method, JSON.stringify(student), {
      "Content-Type": "application/json",
    });
  
   try {
    if(res.message) { message.success(res.message);}
   } catch (error) {
   }
  };
  const HandelSubmit = (handling = "Add" ) => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        const data = {
          firstName: values.firstName,
          groupe: DataToModel.groupe ? DataToModel.groupe : values.groupe,
          email: values.email,
          lastName: values.lastName,
          phone: values.phone,
          birthday: moment(values.birthday).format("YYYY-MM-DD"),
          id :DataToModel._id && DataToModel._id
        };
        console.log(data)
        HandelStudent(data , handling);
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
        DataToModel._id ? [<button
          onClick={HandelDelete}
          key="2"
          className="btn__danger"
        >
          Delete
        </button> ,  <button
          onClick={HandelSubmit.bind(this , "Update")}
          key="3"
          className="btn__primary"
        >
          Update
        </button>] : [ <button
          onClick={HandelSubmit.bind(this, "Add")}
          key="2"
          className="btn__primary"
        >
          Add
        </button>]
          
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
              initialValue={DataToModel.firstName}
            >
              <Input className="input__form" placeholder="First Name"  />
            </Form.Item>
          </div>
          <div className="col-6">
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true }]}
              initialValue={DataToModel.lastName}
            >
              <Input className="input__form" placeholder="Last Name" />
            </Form.Item>
          </div>
        </div>
        <div className="row ">
          <div className="col-6">
            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}    initialValue={DataToModel.phone}>
              <Input className="input__form" placeholder="Phone" />
            </Form.Item>
          </div>
          <div className="col-6">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: "email" }]}
              initialValue={DataToModel.email}
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
              initialValue={DataToModel.birthday && moment(DataToModel.birthday)}
            >
              <DatePicker className="input__form" />
            </Form.Item>
          </div>
          <div className="col-4 ">
            <Form.Item
              label="Groupe"
              name="groupe"
              rules={[{ required: true }]}
              initialValue={DataToModel.groupe && DataToModel.groupe.name}
            
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
