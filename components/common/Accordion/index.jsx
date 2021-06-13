import React, { Children, cloneElement } from "react";
import AccordionItem from "./AccordionItem";

const Accordion = ({ id, children, ...props }) => {
  return (
    <div {...props} id={id} className="accordion accordion-flush">
      {Children.toArray(children).map((child) =>
        child.props.__TYPE === "AccordionItem"
          ? cloneElement(child, { parentId: id })
          : child
      )}
    </div>
  );
};

Accordion.Item = AccordionItem;

export default Accordion;
