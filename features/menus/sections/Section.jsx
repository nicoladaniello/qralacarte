import React, { useEffect, useRef } from "react";
import useOnScreen from "../../../hooks/useOnScreen";
import ProductCard from "../../products/ProductCard";

const Section = ({
  section = {},
  products = [],
  setActive,
  onProductClick,
}) => {
  const ref = useRef();
  const isOnScreen = useOnScreen(ref);

  const { _key, title, description } = section;

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
      <div className="ps-3">
        <h2 className="h1">{title}</h2>
        <p className="text-muted mb-3">{description}</p>
      </div>
      <div ref={ref} className="row g-0 g-sm-1 border-top">
        {products.map((product) => (
          <div key={product._key} className="col-lg-4 mb-lg-3">
            <ProductCard product={product} onClick={onProductClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
