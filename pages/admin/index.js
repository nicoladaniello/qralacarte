import Link from "next/link";
import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import withAuth from "../../components/auth/withAuth";

const AdminPage = () => {
  return (
    <AdminLayout>
      <h1 className="h2 mb-4">Dashboard</h1>
      <div className="row no-gutters">
        <div className="col-4">
          <Link href="admin/restaurants">
            <a>
              <div className="card bg-info text-white border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="card-title">Manage your restaurants</h5>
                  <p className="card-text">Some quick example text.</p>
                </div>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(AdminPage);
