import { useEffect, useState } from "react";

const useOnScreen = (ref) => {
  if (typeof window === "undefined") return false;

  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting),
    { rootMargin: "0px 0px -90% 0px" }
  );

  useEffect(() => {
    // if (!ref.current) return;

    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
};

export default useOnScreen;
