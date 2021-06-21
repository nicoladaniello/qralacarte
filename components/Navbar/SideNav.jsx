import classnames from "classnames";
import Link from "next/link";
import React from "react";
import Brand from "../Brand";
import NavMenu from "./NavMenu";

const SideNav = ({ className, isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className={classnames("modal-backdrop show")}
          onClick={onClose}
        ></div>
      )}
      <aside
        className={classnames(
          className,
          "position-fixed h-100 bg-white overflow-hidden d-flex flex-column flex-shrink-0 shadow-lg"
        )}
        style={{
          transition: "0.5s",
          zIndex: 1050,
          width: "280px",
          transform: `translateX(${isOpen ? "0px" : "-280px"})`,
        }}
      >
        <div className="p-3">
          <div className="pt-1 pb-3">
            <Link href="/">
              <a className="navbar-brand">
                <Brand />
              </a>
            </Link>
          </div>
          <NavMenu className="nav nav-pills flex-column mb-auto" />
        </div>
      </aside>
    </>
  );
};

export default SideNav;
