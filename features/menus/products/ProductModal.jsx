import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Modal from "../../modals";
import useModal from "../../modals/useModal";
import AppImage from "../../../components/AppImage";

const ProductModal = () => {
  const { props, isOpen, close } = useModal(ProductModal);

  const { image, title, description, price } = props?.product || {};

  return (
    <Modal isOpen={isOpen} onClose={() => close()}>
      <div className="position-relative" style={{ minHeight: "3rem" }}>
        {image && <AppImage alt={title} src={image} />}
        <div className="position-absolute d-flex w-100 p-1" style={{ top: 0 }}>
          <button
            className="btn btn-link btn-lg link-secondary bg-light rounded-circle shadow-sm"
            onClick={close}
          >
            <span className="h4 mb-0">
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </button>
        </div>
      </div>
      <Modal.Body>
        <h1 className="mb-0">{title}</h1>
        <p className="text-muted">{description}</p>
        <p className="text-muted">€{price}</p>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
