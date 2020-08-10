import React, { useEffect, useState, createRef, useRef } from "react";
import map from "lodash/map";
import AppMenuNavItem from "./appMenuNavItem";
import classnames from "classnames";
import useMeasure from "../../hooks/useMeasure";

const AppMenuNav = ({ data, activeKey, refs, onClick }) => {
  const ref = useRef();
  const bounds = useMeasure(ref);
  const [currentActiveKey, setCurrentActiveKey] = useState(activeKey);
  const [isSticky, setSticky] = useState(false);

  // Create refs for each nav item
  const navRefs = [];
  data.forEach(({ _key }) => (navRefs[_key] = createRef()));

  // Sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (!bounds) return;
      setSticky(window.pageYOffset > bounds.top);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", () => handleScroll);
  });

  // Scroll nav item into view on active key changed
  useEffect(() => {
    if (currentActiveKey !== activeKey) {
      // The active key changed
      if (ref.current && refs[activeKey].current) {
        // Scroll nav to active nav item
        const { offsetLeft: left } = refs[activeKey].current;
        ref.current.scrollTo({ left });
      }
      // Update current active key
      setCurrentActiveKey(activeKey);
    }
  });

  return (
    <nav
      className={classnames({ "fixed-top shadow-sm": isSticky })}
      style={{ top: "48px" }}
    >
      <div
        ref={ref}
        items={Object.keys(data)}
        className="nav app-scroll-nav p-1 bg-white border-bottom"
      >
        {map(data, ({ _key, section }) => (
          <AppMenuNavItem
            ref={refs[_key]}
            key={_key}
            title={section}
            active={_key === activeKey}
            onClick={() => onClick(_key)}
          />
        ))}
      </div>
    </nav>
  );
};

export default AppMenuNav;
