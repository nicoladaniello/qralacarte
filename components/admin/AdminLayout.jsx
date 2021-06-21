import React from "react";
import useAuth from "../../features/auth/useAuth";
import Loading from "../Loading";
import Navbar from "../Navbar";

const AdminLayout = ({ children }) => {
  const { isLoggedIn } = useAuth({ redirectTo: "/signin" });

  return (
    <>
      <Navbar />
      {!isLoggedIn ? (
        <Loading />
      ) : (
        <div className="bg-light h-100">{children}</div>
      )}
    </>
  );
};

export default AdminLayout;
