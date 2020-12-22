import React from "react";
import { Input } from "antd";
import { At, Lock, Eye, EyeSlash } from "react-bootstrap-icons";
import { Checkbox } from "antd";
import { useFormik } from "formik";
import { Alert } from "antd";
import useHTTP from "../Shared/useHTTP";
import MySpin from "../UI/Spin";
import useAuth from "../Shared/useAuth";
function Login() {
  const { loading, error, fetchData } = useHTTP();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit: async (e, { resetForm }) => {
      console.log(e.login + " " + e.password);
      const dataSent = JSON.stringify({ password: e.password, email: e.login });

      const data = await fetchData("student/login", "POST", dataSent, {
        "Content-Type": "application/json",
      });
      login(data.student, data.token, null);

      resetForm();
    },
    validate: (values) => {
      const errors = {};
      if (!values.login) {
        errors.login = "login required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.login)
      ) {
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
  if (loading) {
    return <MySpin />;
  }

  return (
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
          prefix={<At />}
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

export default Login;
