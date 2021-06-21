import classnames from "classnames";
import { useDrop } from "react-dnd";

const Droppable = ({
  as: Component,
  accept,
  deps,
  onDrop,
  className,
  isOverClass,
  children,
  ...rest
}) => {
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept,
      drop: onDrop,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [...deps]
  );

  return (
    <Component
      {...rest}
      className={classnames(className, { [isOverClass]: isOver })}
      ref={dropRef}
    >
      {children}
    </Component>
  );
};

Droppable.defaultProps = {
  as: "div",
  deps: [],
};

export default Droppable;
