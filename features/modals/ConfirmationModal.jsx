import React from "react";
import Modal from ".";
import useModal from "./useModal";

const ConfirmationModal = () => {
  const modal = useModal(ConfirmationModal);

  return (
    <Modal isOpen={modal.state.isOpen} onClose={() => modal.close()}>
      <Modal.Header>Confirmation</Modal.Header>
      <Modal.Body>Do you onfirm?</Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

export default ConfirmationModal;
