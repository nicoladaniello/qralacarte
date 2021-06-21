import classnames from "classnames";
import uniqueId from "lodash/uniqueId";
import React from "react";
import DropdownItem from "./DropdownItem";
import DropdownLink from "./DropdownLink";
import DropdownMenu from "./DropdownMenu";
import DropdownToggle from "./DropdownToggle";

const Dropdown = ({ as: Component, className, children }) => {
  const id = uniqueId("dropdown-");

  // Pass same ID to Dropdown toggle and menu
  const childrenWithId = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === DropdownToggle) {
        return React.cloneElement(child, { id });
      } else if (child.type === DropdownMenu) {
        return React.cloneElement(child, { id });
      }
    }
    return child;
  });

  // UI
  return (
    <Component className={classnames(className, "dropdown")}>
      {childrenWithId}
    </Component>
  );
};

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.Link = DropdownLink;

Dropdown.defaultProps = {
  as: "div",
};

export default Dropdown;
