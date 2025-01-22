import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Dùng axios để gọi API
import { useFormik } from "formik";
import * as Yup from "yup";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  // Xác định validation schema với Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Mật khẩu không được để trống"),
  });

  // Sử dụng Formik để quản lý form
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

        // Lưu token và role vào localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        // Điều hướng dựa trên vai trò (role)
        if (role === "admin") {
          navigate("/admin"); // Chuyển đến trang admin
        } else if (role === "user") {
          navigate("/"); // Chuyển đến trang user
        }
      } catch (err) {
        // Kiểm tra nếu lỗi do email/mật khẩu không đúng
        if (err.response && err.response.status === 401) {
          setErrors({ submit: "Email hoặc mật khẩu không đúng." });
        } else {
          // Xử lý lỗi khác
          setErrors({ submit: "Đăng nhập thất bại. Vui lòng thử lại." });
        }
      } finally {
        setSubmitting(false); // Kết thúc trạng thái đang gửi
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
