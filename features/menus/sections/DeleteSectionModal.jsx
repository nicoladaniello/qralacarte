import React from "react";
import Modal, { useModal } from "../../modals";
import { useDeleteSectionMutation } from "../api";

const DeleteSectionModal = ({ onConfirm }) => {
  const { isOpen, props, close } = useModal(DeleteSectionModal);
  const [deleteSection, { isLoading }] = useDeleteSectionMutation();

  const handleDelete = async () => {
    if (!props?.section) return;

    try {
      const action = deleteSection(props.section);
      await action.unwrap();
      if (onConfirm) onConfirm();
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal small isOpen={isOpen} onClose={close}>
      <Modal.Header>Delete section</Modal.Header>
      <Modal.Body>
        Permanently delete section "<i>{props?.section?.title}</i>"?
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-light" onClick={close}>
          Dismiss
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={isLoading}
        >
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteSectionModal;
