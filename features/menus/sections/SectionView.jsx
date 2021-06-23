import classnames from "classnames";
import React, { forwardRef, useEffect, useRef } from "react";
import useOnScreen from "../../../hooks/useOnScreen";
import ProductCard from "../products/ProductCard";

const SectionView = forwardRef(
  ({ section = {}, products = [], setActive, onProductClick }, ref) => {
    const isOnScreen = useOnScreen(ref);

    const { _key, title, description, productIds = [] } = section;

    // useEffect(() => {
    //   if (active && ref.current) {
    //     setTimeout(() => {
    //       console.log(`Scrolling section "${title}" into view.`);
    //       setTimeout(() => {
    //         ref.current.scrollIntoView({ behavior: "smooth" });
    //       }, 100);
    //     }, 100);
    //   }
    // }, [active]);

    useEffect(() => {
      if (isOnScreen) setActive(_key);
    }, [isOnScreen, section]);

    return (
      <div className="mb-4">
        <div ref={ref} className="ps-2 ps-lg-0">
          <h4 className="mb-0">{title}</h4>
          <p className="text-muted small mb-1">{description}</p>
        </div>
        <div ref={ref} className="row g-0 g-lg-3">
          {productIds.map((pid, idx) => (
            <div key={pid} className="col-lg-6">
              <ProductCard
                className={classnames("h-100", {
                  "card-list-item": idx !== productIds.length - 1,
                })}
                product={products.find((p) => p._key === pid)}
                onClick={onProductClick}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default SectionView;
