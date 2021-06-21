import React from "react";
import AppImage from "../../../components/AppImage";
import Modal from "../../modals";
import useModal from "../../modals/useModal";

const ProductModal = () => {
  const { props, isOpen, close } = useModal(ProductModal);

  const { image, title, description, price } = props?.product || {};

  return (
    <Modal
      scrollable
      className="modal-fullscreen-sm-down"
      isOpen={isOpen}
      onClose={() => close()}
    >
      <Modal.Header closable>{title}</Modal.Header>
      <Modal.Body className="p-0">
        {image && <AppImage alt={title} src={image} />}
        <div className="p-3">
          <p className="text-muted">{description}</p>
          <p className="text-muted">€{price}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
