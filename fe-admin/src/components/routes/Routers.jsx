import React from "react";
import { Route, Routes } from "react-router-dom";

// Import các component cần thiết
import AdminLayout from "../pages/admin/AdminLayout";
import DashboardAdmin from "../pages/admin/layout/DashboardAdmin";
import ListCustomer from "../pages/admin/layout/ListCustomer";
import ListProduct from "../pages/admin/layout/ListProduct";
import ListPosts from "../pages/admin/layout/ListPosts";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import PageHome from "../pages/home/PageHome";
import ProtectedRoute from "./ProtectedRoute";
import ListOder from "../pages/admin/layout/ListOder";
import ListCategory from "../pages/admin/layout/ListCategory";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<PageHome />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      {/* Admin Layout */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Các route con trong Admin */}
        <Route index element={<DashboardAdmin />} />
        <Route path="/admin/list-category" element={<ListCategory/>}/>
        <Route path="/admin/list-posts" element={<ListPosts />} />
        <Route path="/admin/list-product" element={<ListProduct />} />
        <Route path="/admin/list-customer" element={<ListCustomer />} />
        <Route path="/admin/list-order" element={<ListOder />} />
      </Route>
    </Routes>
  );
}

export default Routers;
