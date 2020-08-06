import React, { forwardRef, useEffect, useState } from "react";
import MenuItem from "./menuItem";
import map from "lodash/map";
import useMeasure from "../../hooks/useMeasure";

const MenuSection = forwardRef(
  ({ data, onScrolledIn, onCLick, ...rest }, ref) => {
    const bounds = useMeasure(ref);
    const [active, setActive] = useState(false);
    const { section, products } = data;

    useEffect(() => {
      const handleScroll = () => {
        if (!bounds) return;

        if (
          window.pageYOffset > bounds.top - 50 &&
          window.pageYOffset < bounds.bottom - 50
        ) {
          if (!active) {
            onScrolledIn(ref);
            setActive(true);
          }
        } else if (active) {
          setActive(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", () => handleScroll);
    });

    return (
      <div ref={ref} {...rest}>
        <div className="p-1">
          <h6 className="mb-0">{section}</h6>
        </div>
        <div className="list-group app-item mb-2">
          {map(products, (menuItem) => (
            <MenuItem
              key={menuItem._key}
              id={menuItem._key}
              data={menuItem}
              onClick={() => onCLick(menuItem._key)}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default MenuSection;
