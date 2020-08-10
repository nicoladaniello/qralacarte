import React from "react";
import MenuSection from "./MenuSection";
import map from "lodash/map";

const AppMenu = ({ data, onScrolledTo, onItemCLick, refs }) => {
  return map(data, (menuSection, idx) => (
    <MenuSection
      ref={refs[menuSection._key]}
      key={menuSection._key}
      id={menuSection._key}
      data={menuSection}
      onScrolledIn={() => onScrolledTo(menuSection._key)}
      onCLick={(itemKey) => onItemCLick(idx, itemKey)}
    />
  ));
};

export default AppMenu;
