import React from "react";
import map from "lodash/map";
import AppMenuNavItem from "./appMenuNavItem";

const AppMenuNav = ({ data, activeKey, refs, onClick }) => (
  <nav className="sticky-top">
    <div
      items={Object.keys(data)}
      className="nav p-1 bg-white border border-top-0"
      style={{
        overflowX: "scroll",
        overflowY: "hidden",
        whiteSpace: "nowrap",
        flexWrap: "nowrap",
        scrollBehavior: "smooth",
      }}
    >
      {map(data, ({ _key, section }) => (
        <AppMenuNavItem
          ref={refs[_key]}
          key={_key}
          id={_key}
          title={section}
          active={_key === activeKey}
          onClick={() => onClick(_key)}
        />
      ))}
    </div>
  </nav>
);

export default AppMenuNav;
