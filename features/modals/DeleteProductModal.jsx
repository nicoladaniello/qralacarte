import { unwrapResult } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import React from "react";
import Modal from ".";
import { useDeleteProductMutation } from "../products/api";
import useModal from "./useModal";

const DeleteProductModal = ({ menuId }) => {
  const { isOpen, props = {}, close } = useModal(DeleteProductModal);
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  // Delete product and close modal on success.
  const handleDelete = () => {
    try {
      const wrap = deleteProduct({ menuId, data: props });
      unwrapResult(wrap);
      close();
    } catch (error) {}
  };

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <Modal.Header>Elimina prodotto</Modal.Header>
      <Modal.Body>
        Eliminare definitivamente il prodotto "{props.title}"?
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-light" onClick={close}>
          annulla
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={isLoading}
        >
          elimina
        </button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteProductModal.propTypes = {
  menuId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
};

export default DeleteProductModal;
