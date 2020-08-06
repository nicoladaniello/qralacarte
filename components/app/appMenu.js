import React from "react";
import MenuSection from "./MenuSection";
import map from "lodash/map";

const AppMenu = ({ data, onScrolledTo, onItemCLick, refs }) => {
  return map(data, (menuSection) => (
    <MenuSection
      ref={refs[menuSection._key]}
      key={menuSection._key}
      id={menuSection._key}
      data={menuSection}
      onScrolledIn={() => onScrolledTo(menuSection._key)}
      onCLick={onItemCLick}
    />
  ));
};

export default AppMenu;
