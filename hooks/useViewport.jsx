import { useState, useEffect } from "react";
import throttle from "lodash/throttle";

// Hook
const useViewport = () => {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Get initial values
    handleResize();

    const throttledResize = throttle(handleResize, 100);

    window.addEventListener("resize", throttledResize);

    return () => window.removeEventListener("resize", throttledResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
};

export default useViewport;
