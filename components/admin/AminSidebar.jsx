import React from "react";
import useAuth from "../auth/useAuth";
import Dropdown from "../common/Dropdown/index";
import Link from "../common/Link";

const AdminSidebar = () => {
  const { currentUser } = useAuth();

  return (
    <div className="d-flex flex-column p-1 h-100 bg-light" style={{ width: "240px" }}>
      <ul className="nav nav-pills flex-column mb-auto text-small">
        <li className="nav-item">
          <Link className="nav-link link-dark" href="/admin">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link link-dark" href="/admin/restaurants">
            My restaurants
          </Link>
        </li>
      </ul>
      <hr />
      <Dropdown
        id="adminSidebarDropdownUser"
        title={<strong>{currentUser.displayName}</strong>}
        linkClassName="link-dark text-decoration-none"
        listClassName="text-small shadow"
      >
        <li>
          <Link className="dropdown-item" href="/">
            New project...
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" href="/">
            Settings
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" href="/">
            Profile
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link className="dropdown-item" href="/">
            Sign out
          </Link>
        </li>
      </Dropdown>
    </div>
  );
};

export default AdminSidebar;
