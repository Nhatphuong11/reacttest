import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { useFormik } from "formik";
import * as Yup from "yup";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Mật khẩu không được để trống"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post(
          "http://localhost:2001/api/auth/login",
          values
        );
        const { token, role } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        if (role === "admin") {
          navigate("/admin"); 
        } else if (role === "user") {
          navigate("/"); 
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setErrors({ submit: "Email hoặc mật khẩu không đúng." });
        } else {
          setErrors({ submit: "Đăng nhập thất bại. Vui lòng thử lại." });
        }
      } finally {
        setSubmitting(false); 
      }
    },
  });

  return (
    <div className="login-page">
      <div className="login_register_wrap">
        <div className="padding_eight_all">
          <div className="heading_s1">
            <h3>Đăng nhập</h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Enter Your Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-message" style={{ marginTop: "10px" }}>{formik.errors.email}</div>
              )}
            </div>
            <div className="form-group" style={{ position: "relative" }}>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
             
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error-message" style={{ marginTop: "10px" }}>{formik.errors.password}</div>
              )}
            </div>
            {formik.errors.submit && (
              <div className="error-message">{formik.errors.submit}</div>
            )}
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-signup"
                disabled={formik.isSubmitting}
                style={{ marginTop: "10px" }}
              >
                {formik.isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
          <div className="form-note text-center">
            Don't have an account? <Link to={"/register"}>Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
