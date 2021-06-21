import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "../../../components/Form";
import Modal, { useModal } from "../../modals";
import { useUpsertSectionMutation } from "../api";
import section from "./SectionView";

const defaultValues = {
  _key: null,
  _menuKey: null,
  title: null,
  description: null,
};

const UpsertSectionModal = () => {
  const { isOpen, props, close } = useModal(UpsertSectionModal);
  const [upsertSection, { isLoading }] = useUpsertSectionMutation();

  const values = {
    ...defaultValues,
    ...props?.defaultValues,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: values });

  const onSubmit = async (data) => {
    try {
      const action = upsertSection(data);
      await action.unwrap();
      close();
    } catch (error) {}
  };

  useEffect(() => void reset(values), [props]);

  return (
    <Modal scrollable isOpen={isOpen} onClose={close}>
      <Modal.Header>{defaultValues._key ? "Edit" : "Add"} section</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-grid gap-2">
            <Form.Field.Input type="hidden" {...register("_key")} />
            <Form.Field.Input type="hidden" {...register("_menuKey")} />
            <Form.Field>
              <Form.Field.Label>Title</Form.Field.Label>
              <Form.Field.Input
                type="text"
                {...register("title", { required: "Insert a title." })}
                invalid={errors?.title}
              />
              <Form.Field.InvalidFeedback>
                {errors?.title?.message}
              </Form.Field.InvalidFeedback>
            </Form.Field>
            <Form.Field>
              <Form.Field.Label>Description</Form.Field.Label>
              <Form.Field.TextArea {...register("description")} />
            </Form.Field>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Form.Button onClick={() => close()}>Dismiss</Form.Button>
        <Form.Submit disabled={isLoading} onClick={handleSubmit(onSubmit)}>
          {isLoading ? "Saving..." : values._key ? "Edit" : "Add"}
        </Form.Submit>
      </Modal.Footer>
    </Modal>
  );
};

export default UpsertSectionModal;
