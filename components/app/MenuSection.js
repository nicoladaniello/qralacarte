import React, { forwardRef, useEffect, useState } from "react";
import MenuItem from "./menuItem";
import map from "lodash/map";
import useMeasure from "react-use-measure";
import { useViewportScroll } from "framer-motion";
import mergeRefs from "react-merge-refs";

const MenuSection = forwardRef(
  ({ data, onScrolledIn, onCLick, ...rest }, ref) => {
    const [mRef, bounds] = useMeasure();
    const { scrollY } = useViewportScroll();
    const [active, setActive] = useState(false);

    useEffect(() =>
      scrollY.onChange((latest) => {
        if (latest > bounds.top - 50 && latest < bounds.bottom - 50) {
          if (!active) {
            onScrolledIn(ref);
            setActive(true);
          }
        } else if (active) {
          setActive(false);
        }
      })
    );

    const { section, products } = data;

    return (
      <div ref={mergeRefs([ref, mRef])} {...rest}>
        <div className="p-1">
          <h6 className="mb-0">{section}</h6>
        </div>
        <div className="list-group mb-2">
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
