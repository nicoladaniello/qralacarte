import React from "react";
import Layout from "../Layout";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <Layout title="Admin board">
      <AdminNavbar fluid className="shadow-sm" />
      <div className="row no-gutters h-100">
        <div className="col-auto h-100" style={{ overflowY: "auto" }}>
          <AdminSidebar />
        </div>
        <div className="col h-100" style={{ overflowY: "auto" }}>
          <div className="container py-4">{children}</div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLayout;
