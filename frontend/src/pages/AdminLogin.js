import React, { useEffect } from "react";
import { Input } from "antd";
import { At, Lock, Eye, EyeSlash, Person } from "react-bootstrap-icons";
import { Checkbox } from "antd";
import { useFormik } from "formik";
import { Alert } from "antd";
import useHTTP from "../Shared/useHTTP";
import MySpin from "../UI/Spin";
import useAdmin from "../Shared/useAdmin";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
function AdminLogin() {
  const { loading, error, fetchData } = useHTTP();
  const { login } = useAdmin();
  const token = useSelector((state) => state.admin.token);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit: async (e, { resetForm }) => {
      const dataSent = JSON.stringify({ password: e.password, login: e.login });

      const data = await fetchData("admin/login", "POST", dataSent, {
        "Content-Type": "application/json",
      });
      console.log(data);
      login(data.admin, data.token, null);

      resetForm();
    },
    validate: (values) => {
      const errors = {};
      if (!values.login) {
        errors.login = "login required";
      } else if (values.login.length < 6) {
        errors.login = "please check your email";
      }

      if (!values.password) {
        errors.login = "password required";
      } else if (values.password.length < 6) {
        errors.login = "password is too short";
      }
      return errors;
    },
  });
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  useEffect(() => {
    if (token) {
      history.push("/Admin");
    }
  }, [token]);
  return loading ? (
    <MySpin />
  ) : (
    <div className="from__center">
      <form className="Form " onSubmit={formik.handleSubmit}>
        {error ? (
          <Alert message={error} type="error" className="w-300" showIcon />
        ) : null}
        {formik.touched.login && formik.errors.login ? (
          <Alert
            message={formik.errors.login}
            type="error"
            className="w-300"
            showIcon
          />
        ) : null}
        {formik.touched.password && formik.errors.password ? (
          <Alert
            message={formik.errors.password}
            type="error"
            className="w-300"
            showIcon
          />
        ) : null}
        <Input
          className="input__text"
          name="login"
          onChange={formik.handleChange}
          value={formik.values.login}
          placeholder="Login"
          prefix={<Person />}
        />
        <Input.Password
          prefix={<Lock />}
          name="password"
          placeholder="password"
          onChange={formik.handleChange}
          className="input__text"
          value={formik.values.password}
          iconRender={(visible) => (visible ? <Eye /> : <EyeSlash />)}
        />
        <Checkbox className="checkBox" onChange={onChange}>
          Remmember me
        </Checkbox>
        <button type="submit" className="btn__form">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
