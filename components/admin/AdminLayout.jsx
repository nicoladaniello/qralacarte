import React from "react";
import useAuth from "../auth/useAuth";
import Loading from "../common/Loading";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children }) => {
  const { isLoggedIn } = useAuth({ redirectTo: "/signin" });

  return (
    <>
      <AdminNavbar fluid className="shadow-sm" />
      {!isLoggedIn ? (
        <Loading />
      ) : (
        <div className="flex-grow-1">{children}</div>
      )}
    </>
  );
};

export default AdminLayout;
