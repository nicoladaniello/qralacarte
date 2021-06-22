import React from "react";
import Modal, { useModal } from "../../modals";
import { useDeleteProductMutation } from "../api";

const DeleteProductModal = ({ onConfirm }) => {
  const { isOpen, props, close } = useModal(DeleteProductModal);
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDeleteProduct = async () => {
    if (!props?.product) return;

    try {
      const action = deleteProduct(props.product);
      await action.unwrap();
      if (onConfirm) onConfirm();
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal scrollable small isOpen={isOpen} onClose={close}>
      <Modal.Header>Delete product</Modal.Header>
      <Modal.Body>Permanently delete this product?</Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-light" onClick={close}>
          Dismiss
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDeleteProduct}
          disabled={isLoading}
        >
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteProductModal.displayName = "DeleteProductModal";

export default DeleteProductModal;
