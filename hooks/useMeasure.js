import { useState, useEffect } from "react";

const useMeasure = (ref) => {
  const [bounds, setBounds] = useState();

  useEffect(() => {
    if (bounds || !ref.current) return;
    setBounds(getBounds(ref.current));
  });

  return bounds;
};

function getBounds(el) {
  // iPad or iPhone
  const boundingRect = el.getBoundingClientRect();
  const body = document.body || document.getElementsByTagName("body")[0];
  const clientTop = document.documentElement.clientTop || body.clientTop || 0;
  const clientLeft =
    document.documentElement.clientLeft || body.clientLeft || 0;
  const scrollTop =
    window.pageYOffset || document.documentElement.scrollTop || body.scrollTop;
  const scrollLeft =
    window.pageXOffset ||
    document.documentElement.scrollLeft ||
    body.scrollLeft;

  return {
    top: boundingRect.top + scrollTop - clientTop,
    left: boundingRect.left + scrollLeft - clientLeft,
    bottom: boundingRect.bottom + scrollLeft - clientTop,
  };
}

export default useMeasure;
