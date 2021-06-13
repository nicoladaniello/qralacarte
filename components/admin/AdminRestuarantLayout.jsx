import React from "react";
import AdminLayout from "./AdminLayout";

const AdminRestaurantLayout = ({ crumbs, caption, title, children }) => {
  return (
    <AdminLayout crumbs={crumbs}>
      <div className="my-4">
        {caption && <h6 className="text-muted mb-1">{caption}</h6>}
        {title && <h1 className="h2">{title}</h1>}
      </div>
      <div className="container">{children}</div>
    </AdminLayout>
  );
};

export default AdminRestaurantLayout;
