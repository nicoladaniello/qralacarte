import Link from "next/link";
import React from "react";
import Alert from "../../../components/Alert";
import Breadcrumb from "../../../components/Breadcrumb";
import Loading from "../../../components/Loading";
import Nav from "../../../components/Nav";
import Page from "../../../components/Page";
import Authenticated from "../../../features/auth/Authenticated";
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
    <Authenticated>
      <Page>
        <div className="card border-0 rounded-0">
          <div className="container pt-lg-2">
            <Breadcrumb>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>Menus</Breadcrumb.Item>
            </Breadcrumb>
            <div className="d-flex">
              <h1 className="h2 pb-lg-2 me-auto">Menus</h1>
              <div>
                <Link href="/new">
                  <a className="btn btn-primary">Create menu</a>
                </Link>
              </div>
            </div>
            <Nav className="mb-1">
              <Nav.Item href="/admin/menus">Menus</Nav.Item>
              {/* <Nav.Item href="/admin/settings" className="disabled">
                Settings
              </Nav.Item> */}
            </Nav>
          </div>
        </div>
        <div className="container mt-4">
          {process.env.NEXT_PUBLIC_DEVELOPMENT &&
            currentUser?.uid === "cPK4bcvTdHYKHEiNtDfAm6A2uCE2" && (
              <Alert info className="text-start small mb-4">
                <h6 className="alert-heading">This account is sandboxed.</h6>
                Every time someone signs in to this account, the data will be
                restored.
              </Alert>
            )}

          {currentUser?.signInProvider === "anonymous" && (
            <Alert warning className="text-start small mb-4">
              <h6 className="alert-heading">Sign up to save your data.</h6>
              Ensure you{" "}
              <Link href="/signin">
                <a className="alert-link">sign up</a>
              </Link>{" "}
              to activate your account and avoid losing your data.
            </Alert>
          )}

          {isLoading && <Loading />}
          {isError && <Alert danger>{error?.message}</Alert>}
          {isSuccess && (
            <div className="row align-items-stretch">
              {!!data?.length ? (
                data.map((menu) => (
                  <div key={menu._key} className="col-lg-4 mb-4">
                    <MenuCard className="shadow-sm mb-4" menu={menu} />
                  </div>
                ))
              ) : (
                <p className="text-muted mb-0">Nothing to show!</p>
              )}
            </div>
          )}
        </div>
      </Page>
    </Authenticated>
  );
};

export default withAuth(AdminVenueListings);
