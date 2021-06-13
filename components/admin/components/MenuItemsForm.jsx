import { PropTypes } from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UpsertProductModal from "../../../features/modals/UpsertProductModal.jsx";
import useModal from "../../../features/modals/useModal.js";
import Draggable from "../../common/dnd/Draggable.jsx";
import Droppable from "../../common/dnd/Droppable.jsx";

/**
 * Form to manage items of a menu.
 */
const MenuItemsForm = ({ items, keys, onSubmit }) => {
  const { handleSubmit, register } = useForm();
  const [positions, setPositions] = useState(keys);
  const upsertModal = useModal(UpsertProductModal);

  const changeItemPosition = ({ idx }, pos) => {
    if (idx === pos) return;

    const newPos = [...positions];
    newPos.splice(pos, 0, newPos.splice(idx, 1)[0]);
    setPositions(newPos);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="list-group">
          {positions.map((key, idx) => (
            <Droppable
              key={idx}
              as="a"
              className="list-group-item list-group-item-action"
              accept="item"
              onDrop={(item) => changeItemPosition(item, idx)}
              deps={[positions]}
            >
              <Draggable
                className="d-flex align-items-center"
                type="item"
                item={{ idx }}
              >
                <img
                  className="img-fluid"
                  alt="..."
                  src="https://baconmockup.com/120/120"
                />
                <div className="flex-grow-1 ps-2">
                  <div className=" d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{items[key].title}</h5>
                    <small>€{items[key].price}</small>
                  </div>
                  <p className="mb-1">{items[key].description}</p>
                </div>
              </Draggable>
            </Droppable>
          ))}
          <div className="col-12 mb-4">
            <div className="card shadow-sm border-0 bg-light">
              <div className="card-body d-flex align-items-center">
                <p className="card-text text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => upsertModal.open()}
                  >
                    Aggiungi
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
      <UpsertProductModal />
    </>
  );
};

MenuItemsForm.propTypes = {
  items: PropTypes.object,
  keys: PropTypes.array,
  onSubmit: PropTypes.func,
};

MenuItemsForm.defaultProps = {
  items: {},
  keys: [],
  onSubmit: () => {},
};

export default MenuItemsForm;
