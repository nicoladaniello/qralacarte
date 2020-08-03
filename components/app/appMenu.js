import React, { useEffect } from "react";
import MenuSection from "./MenuSection";
import map from "lodash/map";

const AppMenu = ({ data, onScrolledTo, onCLick, refs }) => {
  if (!data) return null;

  return map(data, (menuSection) => (
    <MenuSection
      ref={refs[menuSection._key]}
      key={menuSection._key}
      id={menuSection._key}
      data={menuSection}
      onScrolledIn={() => onScrolledTo(menuSection._key)}
      onCLick={onCLick}
    />
  ));
};

export default AppMenu;
