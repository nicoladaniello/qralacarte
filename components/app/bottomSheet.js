import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PirceTag from "./priceTag";

const BottomSheet = ({ data, show, onHide }) => {
  const ref = useRef();
  const { images, name, description } = data;

  const handleDragEnd = (event, info) => {
    const threshold = ref.current.clientHeight * 0.5;
    const shouldClose =
      info.velocity.y > 20 ||
      (info.velocity.y >= 0 && info.point.y >= threshold);

    if (ref.current && shouldClose) onHide();
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="bottom-sheet-backdrop" onClick={onHide}>
          <motion.div
            ref={ref}
            drag="y"
            onDragEnd={handleDragEnd}
            dragConstraints={{ top: 0 }}
            initial={{ y: "100%" }}
            animate={{ y: 10 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 40,
              stiffness: 400,
            }}
            className="card border-0 bottom-sheet"
          >
            {!!images && (
              <div
                className="p-1 rounded-top"
                style={{
                  width: "100%",
                  height: "240px",
                  background: `url('${images.mobile}') no-repeat center`,
                  backgroundSize: "cover",
                }}
              ></div>
            )}
            <div className="list-group">
              <div className="list-group-item px-1 list-group-item-action rounded-0">
                <h2 className="mb-1">{name}</h2>
                <ul className="list-unstyled text-muted small">
                  <PirceTag data={data} />
                  {!!description && <li>{description}</li>}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
