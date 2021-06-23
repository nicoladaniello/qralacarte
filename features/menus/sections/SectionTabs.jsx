import classnames from "classnames";
import React, { useEffect, useRef } from "react";

const SectionTab = ({ section, active, setActive, onScrollTo }) => {
  const ref = useRef();
  const { _key, title } = section;

  useEffect(() => {
    if (active && ref.current) {
      onScrollTo(ref.current.offsetLeft);
    }
  }, [active]);

  return (
    <button
      ref={ref}
      onClick={() => setActive(_key)} //setActive(_key)
      className={classnames("nav-link btn-link", {
        active,
      })}
    >
      {title}
    </button>
  );
};

/**
 * Form to insert new menu sections.
 */
const SectionTabs = ({ sections, active, setActive, className }) => {
  const scrollRef = useRef();

  // Scroll active tab into view
  const scrollToOffset = (offset) => {
    scrollRef.current?.scrollTo({ left: offset, behavior: "smooth" });
  };

  const { ids = [], entities = [] } = sections || {};

  return (
    <div className={classnames(className, "card small")}>
      <div className="card-body p-1 pb-0">
        <nav
          ref={scrollRef}
          className={"nav nav-pills flex-nowrap overflow-auto pb-1"}
          style={{ whiteSpace: "nowrap" }}
        >
          {ids.map((sid) => (
            <SectionTab
              key={sid}
              section={entities.find((e) => e._key === sid)}
              active={active === sid}
              setActive={setActive}
              onScrollTo={scrollToOffset}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SectionTabs;
