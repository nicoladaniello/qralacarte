import { unwrapResult } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import React from "react";
import Modal from ".";
import { useUpsertProductMutation } from "../products/api";
import ProductForm from "../products/ProductForm";
import useModal from "./useModal";

const UpsertProductModal = ({ menuId, sections }) => {
  const { isOpen, props = {}, close } = useModal(UpsertProductModal);
  const [upsertProduct, { isLoading }] = useUpsertProductMutation();

  // Upsert product on form submission.
  const handleSubmit = (data) => {
    try {
      const wrap = upsertProduct({ menuId, data });
      unwrapResult(wrap);
      close();
    } catch (error) {}
  };

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <Modal.Header>
        {props._key ? "Modifica" : "Aggiungi"} prodotto
      </Modal.Header>
      <ProductForm defaultValues={props.defaultValues} onSubmit={handleSubmit}>
        <Modal.Body>
          <ProductForm.Fields menuSections={sections} />
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-light" onClick={close}>
            annulla
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            conferma
          </button>
        </Modal.Footer>
      </ProductForm>
    </Modal>
  );
};

UpsertProductModal.propTypes = {
  menuId: PropTypes.string.isRequired,
  sections: PropTypes.array,
  onSuccess: PropTypes.func,
};

UpsertProductModal.defaultProps = {
  sections: [],
};

export default UpsertProductModal;
