import { PropTypes } from "prop-types";
import React from "react";
import { useDrag } from "react-dnd";

const Draggable = ({ type, item, deps, children }) => {
  const [{ isDragging }, ref, previewRef] = useDrag(
    () => ({
      type,
      item,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [...deps]
  );

  React.Children.only(children);

  const Child = React.cloneElement(children, {
    drag: { ref, previewRef, isDragging },
  });

  return Child;
};

Draggable.propTypes = {
  type: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  deps: PropTypes.array,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Draggable.defaultProps = {
  deps: [],
};

export default Draggable;
