import Link from "next/link";
import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import withAuth from "../../components/auth/withAuth";
import Breadcrumb from "../../components/common/Breadcrumb";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="container pt-4">
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="h2 mb-4">Dashboard</h1>
        <div className="row">
          <div className="col-lg-3">
            <div className="card shadow-sm h-100">
              <img
                className="card-img"
                alt="Gestiione locali"
                src="/images/illustrations/listings.svg"
              />
              <div className="card-body">
                <h4 className="card-title mb-0">Gestisci i tuoi locali</h4>
                <p className="card-text text-muted">
                  Modifica il profilo e i menú dei tuoi locali.
                </p>
              </div>
              <div className="card-footer p-0">
                <Link href="/admin/venues" passHref>
                  <a className="btn btn-primary p-2 rounded-0 w-100">
                    Gestisci
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(Dashboard);
