import React from "react";
import Modal from ".";
import Form from "../../components/common/form";
import useModal from "./useModal";

const EditSectionModal = ({ onConfirm }) => {
  const modal = useModal(EditSectionModal);

  return (
    <Modal isOpen={modal.isOpen} onClose={() => modal.close()}>
      <Form onSubmit={onConfirm}>
        <Modal.Header>Modifica sezione</Modal.Header>
        <Modal.Body>
          <Form.Input
            name="_key"
            type="hidden"
            defaultValue={modal.props?._key}
          />
          <Form.Input
            name="position"
            type="hidden"
            defaultValue={modal.props?.position}
          />
          <Form.FloatingLabelField label="Titolo" name="title">
            <Form.Input
              className="mb-2"
              type="text"
              placeholder="Antipasti"
              options={{ required: "Inserisci un titolo." }}
              defaultValue={modal.props?.title}
            />
          </Form.FloatingLabelField>
          <Form.FloatingLabelField label="Descrizione" name="description">
            <Form.Input
              type="text"
              placeholder="Per stuzzicare l'appetito."
              defaultValue={modal.props?.description}
            />
          </Form.FloatingLabelField>
        </Modal.Body>
        <Modal.Footer
          actions={{ confirm: { label: "Modifica", type: "submit" } }}
        />
      </Form>
    </Modal>
  );
};

export default EditSectionModal;
