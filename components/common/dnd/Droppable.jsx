import { PropTypes } from "prop-types";
import React from "react";
import { useDrop } from "react-dnd";

const Droppable = ({ accept, deps, onDrop, children }) => {
  const [{ isOver }, ref] = useDrop(
    () => ({
      accept,
      drop: onDrop,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [...deps]
  );

  React.Children.only(children);

  const Child = React.cloneElement(children, {
    drop: { ref, isOver },
  });

  return Child;
};

Droppable.propTypes = {
  accept: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
  deps: PropTypes.array,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Droppable.defaultProps = {
  deps: [],
};

export default Droppable;
