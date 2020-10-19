import React, { useState, createRef } from "react";
import AppHeader from "./appHeader";
import AppMenuNav from "./appMenuNav";
import AppMenu from "./appMenu.js";
import AppFooter from "./appFooter";
import AppTopNav from "./appTopNav";
import BottomSheet from "./bottomSheet";

const AppLayout = ({ data }) => {
  const { info, menu, translations, language } = data;
  const [activeKey, setActiveKey] = useState();
  const [showModal, setShowModal] = useState();
  const [modalData, setModalData] = useState({});

  const navRefs = new Array();
  const sectionRefs = new Array();

  menu.forEach(({ _key }) => {
    navRefs[_key] = createRef();
    sectionRefs[_key] = createRef();
  });

  const handleScrollTo = (key) => {
    setActiveKey(key);
  };

  const handleNavItemClick = (key) => {
    if (sectionRefs[key].current) {
      sectionRefs[key].current.scrollIntoView();
    }
  };

  const handleMenuItemClick = (sectionIdx, itemIdx) => {
    if (!menu[sectionIdx]?.products[itemIdx]?.images) return;

    setModalData(menu[sectionIdx].products[itemIdx]);

    setShowModal(true);
  };

  return (
    <div
      className="bg-primary d-flex flex-column mx-auto"
      style={{ maxWidth: "740px" }}
    >
      <div
        className="card border-0 bg-light mx-auto"
        style={{ maxWidth: "420px" }}
      >
        <AppTopNav data={{ translations, language, title: info.title }} />
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
            onItemCLick={handleMenuItemClick}
          />

          <BottomSheet
            data={modalData}
            show={showModal}
            onHide={() => setShowModal(false)}
          />
        </main>
        <AppFooter />
      </div>
    </div>
  );
};

export default AppLayout;
