import classnames from "classnames";
import React, { useState } from "react";
import Measure from "react-measure";

const Collapse = ({ maxHeight, children, ...rest }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [height, setHeight] = useState();

  const toggle = (e) => {
    e.preventDefault();
    setCollapsed(!collapsed);
  };

  const collapsedStyle = {
    maxHeight,
    overflow: "hidden",
    transition: "all 0.3s ease-out",
  };

  return (
    <div {...rest}>
      <div className="position-relative">
        <Measure bounds onResize={({ bounds }) => setHeight(bounds.height)}>
          {({ measureRef }) => (
            <div
              ref={measureRef}
              style={true && collapsed ? collapsedStyle : null}
            >
              {children}
            </div>
          )}
        </Measure>
        {height >= maxHeight && collapsed && (
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
        )}
      </div>
      {height >= maxHeight && (
        <a className="small" href="#" onClick={toggle}>
          {collapsed ? "Show more +" : "Show less -"}
        </a>
      )}
    </div>
  );
};

Collapse.defaultProps = {
  maxHeight: 120,
};

export default Collapse;
