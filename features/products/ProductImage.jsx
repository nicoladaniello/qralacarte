import Image from "next/image";
import React from "react";

const ProductImage = ({ product }) => {
  const { title, image } = product || {};

  return !image ? null : (
    <div
      className="position-relative overflow-hidden"
      style={{ paddingBottom: "100%" }}
    >
      <Image layout="fill" objectFit="cover" alt={title} src={image} />
    </div>
  );
};

export default ProductImage;
