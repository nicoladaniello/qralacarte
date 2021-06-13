import classnames from "classnames";
import { PropTypes } from "prop-types";
import React, { useEffect, useRef, useState } from "react";

const isClient = typeof window !== "undefined";

const AccordionItem = ({
  id,
  parentId,
  header,
  className,
  children,
  ...props
}) => {
  const ref = useRef();
  const [collapse, setCollapse] = useState();
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => {
    if (!collapse) return;

    collapse.toggle();
    setCollapsed(!collapsed);
  };

  // Initialize bootstrap dropdown
  useEffect(() => {
    if (!isClient || !ref.current) return;
    // Require it here as top import couses bug in SSR.
    const BSCollapse = require("bootstrap/js/dist/collapse");
    let instance = BSCollapse.getInstance(ref.current);
    setCollapse(instance ? instance : new BSCollapse(ref.current));
  }, [ref]);

  return (
    <div
      {...props}
      className={classnames(className, "accordion-item")}
      id={`heading-${id}`}
    >
      <h2 className="accordion-header">
        <button
          className={classnames("accordion-button", { collapsed })}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={id}
          aria-expanded={!collapsed}
          aria-controls={id}
          onClick={toggle}
        >
          {header}
        </button>
      </h2>
      <div
        ref={ref}
        id={id}
        className="accordion-collapse collapse show"
        aria-labelledby={`heading-${id}`}
        data-bs-parent={parentId}
      >
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
};

AccordionItem.propTypes = {
  id: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
  linkClassName: PropTypes.string,
  __TYPE: PropTypes.string,
};

AccordionItem.defaultProps = {
  __TYPE: "AccordionItem",
};

export default AccordionItem;
