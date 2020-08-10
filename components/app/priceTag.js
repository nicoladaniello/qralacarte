import React from "react";

const PirceTag = ({ data }) => {
  const { price, pricePerPerson, priceForGrams, preordered } = data;

  return (
    <p className="small text-muted mb-0">
      {!!price && <>€{price}</>}
      {!!pricePerPerson && <> per persona</>}
      {!!priceForGrams && <> per {priceForGrams} grammi</>}
      {!!preordered && <>su ordinazione</>}
    </p>
  );
};

export default PirceTag;
