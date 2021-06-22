import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AppImage from "../../components/AppImage";
import Form, { FileInput } from "../../components/Form";
import Modal, { useModal } from "../modals";
import {
  useDeleteMenuImageMutation,
  useUpdateMenuInfoMutation,
  useUploadMenuImageMutation,
} from "./api";

const defaultValues = {
  _key: null,
  image: null,
  title: null,
  description: null,
};

const UpdateMenuModal = () => {
  const { isOpen, props, close } = useModal(UpdateMenuModal);
  const [updateMenu, { isLoading }] = useUpdateMenuInfoMutation();
  const [deleteImage, { isLoading: isDeleting }] = useDeleteMenuImageMutation();
  const [uploadImage, { isLoading: isUploading }] =
    useUploadMenuImageMutation();

  const [img, setImg] = useState();

  const values = {
    ...defaultValues,
    ...props?.defaultValues,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ values });

  // Upsert product on form submission.
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const action = updateMenu(data);
      await action.unwrap();
      close();
    } catch (error) {}
  };

  const handleDeleteImage = async () => {
    try {
      const action = deleteImage(values);
      await action.unwrap();
      setImg(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = async (fileUrl) => {
    try {
      const action = uploadImage({ menu: values, fileUrl });
      const result = await action.unwrap();
      setImg(result.image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setImg(values.image);
    reset(values);
  }, [props]);

  return (
    <Modal scrollable isOpen={isOpen} onClose={close}>
      <Modal.Header>Update menu information</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(console.log)}>
          <div className="d-grid gap-2">
            <AppImage src={img} />
            <div className="text-end">
              <FileInput
                className="btn-sm me-2"
                disabled={isUploading}
                onChange={handleUploadImage}
              >
                Upload image
              </FileInput>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={handleDeleteImage}
                disabled={isDeleting || !values.image}
              >
                Delete image
              </button>
            </div>
            <Form.Field.Input type="hidden" {...register("_key")} />
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
            <Form.Field>
              <Form.Field.Label>Address</Form.Field.Label>
              <Form.Field.Input {...register("address")} />
            </Form.Field>
            <Form.Field>
              <Form.Field.Label>Phone number</Form.Field.Label>
              <Form.Field.Input {...register("tel")} />
            </Form.Field>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Form.Button onClick={() => close()}>Dismiss</Form.Button>
        <Form.Submit disabled={isLoading} onClick={handleSubmit(onSubmit)}>
          {isLoading ? "Loading..." : "Update"}
        </Form.Submit>
      </Modal.Footer>
    </Modal>
  );
};

UpdateMenuModal.displayName = "UpdateMenuModal";

export default UpdateMenuModal;
