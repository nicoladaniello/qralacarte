import React, { useState, createRef } from "react";
import AppHeader from "./appHeader";
import AppMenuNav from "./appMenuNav";
import AppMenu from "./appMenu.js";

const AppLayout = ({ data }) => {
  const { info, menu, translations, language } = data;
  const [activeKey, setActiveKey] = useState();

  const navRefs = new Array();
  const sectionRefs = new Array();

  menu.forEach(({ _key }) => {
    navRefs[_key] = createRef();
    sectionRefs[_key] = createRef();
  });

  const handleScrollTo = (key) => {
    setActiveKey(key);

    if (navRefs[key].current) navRefs[key].current.scrollIntoView(true);
  };

  const handleNavItemClick = (key) => {
    if (sectionRefs[key].current) sectionRefs[key].current.scrollIntoView();
    if (navRefs[key].current) navRefs[key].current.scrollIntoView(true);
  };

  const handleMenuItemClick = (key) => {};

  return (
    <div className="card border-0 bg-light">
      <AppHeader
        data={{ ...info, translations, language }}
        onShowModal={() => null}
      />
      <main>
        <AppMenuNav
          data={menu}
          activeKey={activeKey}
          refs={navRefs}
          onClick={handleNavItemClick}
        />

        <AppMenu
          data={menu}
          onScrolledTo={handleScrollTo}
          refs={sectionRefs}
          onCLick={handleMenuItemClick}
        />
      </main>
    </div>
  );
};

export default AppLayout;
