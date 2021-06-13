import classnames from "classnames";
import { PropTypes } from "prop-types";
import React, { useEffect, useRef } from "react";

const SectionTab = ({ section, active, setActive, onScrollTo }) => {
  const ref = useRef();
  const { _key, title } = section;

  useEffect(() => {
    if (active && ref.current) {
      console.log(`Scrolling tab "${title}" into view.`);
      onScrollTo(ref.current.offsetLeft);
    }
  }, [active]);

  return (
    <button
      ref={ref}
      onClick={() => {}} //setActive(_key)
      className={classnames("nav-link btn-link", {
        "link-primary bg-light": active,
        "link-secondary": !active,
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

  return (
    <div className={classnames(className, "card")}>
      <div className="card card-body p-1 pb-0">
        <nav
          ref={scrollRef}
          className={"nav nav-pills flex-nowrap overflow-auto pb-1"}
          style={{ whiteSpace: "nowrap" }}
        >
          {[...sections]
            .sort((a, b) => a.position - b.position)
            .map((section) => (
              <SectionTab
                key={section._key}
                section={section}
                active={active === section._key}
                setActive={setActive}
                onScrollTo={scrollToOffset}
              />
            ))}
        </nav>
      </div>
    </div>
  );
};

SectionTabs.propTypes = {
  sections: PropTypes.array,
};

SectionTabs.defaultProps = {
  sections: [],
};

export default SectionTabs;
