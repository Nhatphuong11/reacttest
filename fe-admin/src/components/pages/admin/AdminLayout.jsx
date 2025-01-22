import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsCart4 ,
  BsBoxArrowLeft,
  BsGridFill,
} from "react-icons/bs";
import "./AdminCSS.css"
function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <aside id='sidebar' className={"sidebar-responsive"}>
      <div className='sidebar-title'>
        <div className='sidebar-brand' style={{ padding: "20px" }}>
          <BsCart3 className='icon_header' /> SHOP
        </div>
        <span className='icon close_icon'>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to={"/admin"}>
            <BsGrid1X2Fill className='icon' /> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={"/admin/list-customer"}>
            <BsPeopleFill className='icon' /> Manager User
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={"/admin/list-category"}>
          <BsGridFill className='icon'/> Manager Category
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={"/admin/list-product"}>
            <BsFillArchiveFill className='icon' /> Manager Product
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={"/admin/List-posts"}>
            <BsFillGrid3X3GapFill className='icon' /> post
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={"/admin/List-order"}>
            <BsCart4  className='icon' /> list Oder
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <a href='/login'>
            <BsBoxArrowLeft className='icon' /> Logout
          </a>
        </li>
      </ul>
    </aside>


      {/* Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet /> {/* Render các route con */}
      </main>
    </div>
  );
}

export default AdminLayout;
