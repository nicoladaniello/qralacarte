import React, { createContext, useContext } from "react";
import { useDrag } from "react-dnd";

const dragContext = createContext();

const Draggable = ({ type, item, deps, children }) => {
  const [{ isDragging }, dragRef, previewRef] = useDrag(
    () => ({
      type,
      item,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [...deps]
  );

  return (
    <dragContext.Provider value={{ dragRef, previewRef, isDragging }}>
      {children}
    </dragContext.Provider>
  );
};

const Drag = ({ as: Component, style, children, ...rest }) => {
  const { dragRef, isDragging } = useContext(dragContext);
  return (
    <Component
      {...rest}
      ref={dragRef}
      style={{ cursor: isDragging ? "grabbing" : "grab", ...style }}
    >
      {children}
    </Component>
  );
};

const Preview = ({ as: Component, children, ...rest }) => {
  const { previewRef } = useContext(dragContext);
  return (
    <Component {...rest} ref={previewRef}>
      {children}
    </Component>
  );
};

Draggable.Drag = Drag;
Draggable.Preview = Preview;

Draggable.defaultProps = {
  deps: [],
};
Drag.defaultProps = {
  as: "div",
};
Preview.defaultProps = {
  as: "div",
};

export default Draggable;
