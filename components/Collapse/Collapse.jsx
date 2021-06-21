import classnames from "classnames";
import React, { useRef, useState } from "react";

const Collapse = ({ height, children }) => {
  const ref = useRef();
  const [collapsed, setCollapsed] = useState(true);

  const toggle = (e) => {
    e.preventDefault();
    setCollapsed(!collapsed);
  };

  const collapsedStyle = {
    height: height || "6em",
    overflow: "hidden",
  };

  return (
    <>
      <div className="position-relative">
        <div ref={ref} style={collapsed ? collapsedStyle : null}>
          {children}
        </div>
        <div
          className={classnames({ "d-none": !collapsed })}
          style={{
            position: "absolute",
            left: "0px",
            right: "0px",
            bottom: "0px",
            height: "50%",
            backgroundImage:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0.1), white)",
          }}
        />
      </div>
      <a className="small" href="#" onClick={toggle}>
        {collapsed ? "Show more +" : "Show less -"}
      </a>
    </>
  );
};

export default Collapse;
