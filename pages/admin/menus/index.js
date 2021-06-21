import React from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import Alert from "../../../components/Alert";
import Loading from "../../../components/Loading";
import Nav from "../../../components/Nav";
import useAuth from "../../../features/auth/useAuth";
import withAuth from "../../../features/auth/withAuth";
import { useGetUserMenusQuery } from "../../../features/menus/api";
import MenuCard from "../../../features/menus/MenuCard";

const AdminVenueListings = () => {
  const { currentUser } = useAuth();
  const { data, error, isLoading, isSuccess, isError } = useGetUserMenusQuery(
    currentUser.uid
  );

  return (
    <AdminLayout>
      <div className="card border-0 border-bottom">
        <div className="container pt-lg-2">
          <div className="d-flex">
            <h1 className="h2 pb-lg-2 me-auto">Menus</h1>
          </div>
          <Nav className="mb-1">
            <Nav.Item href="/admin/menus">Menus</Nav.Item>
            <Nav.Item href="/admin/invoices">Invoices</Nav.Item>
            <Nav.Item href="/admin/settings">Settings</Nav.Item>
          </Nav>
        </div>
      </div>
      <div className="container mt-4">
        {isLoading && <Loading />}
        {isError && <Alert danger>{error?.message}</Alert>}
        {isSuccess && (
          <div className="row align-items-stretch">
            {!!data?.length ? (
              data.map((menu) => (
                <div key={menu._key} className="col-lg-6 mb-4">
                  <MenuCard menu={menu} />
                </div>
              ))
            ) : (
              <p className="text-muted mb-0">Nothing to show!</p>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default withAuth(AdminVenueListings);
