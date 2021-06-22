import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AppImage from "../../../components/AppImage";
import Form, { FileInput } from "../../../components/Form";
import Modal from "../../modals";
import useModal from "../../modals/useModal";
import {
  useDeleteProductImageMutation,
  useUploadProductImageMutation,
  useUpsertProductMutation,
} from "../api";
import product from "./product";

const UpsertProductModal = () => {
  const { isOpen, props, close } = useModal(UpsertProductModal);
  const [upsertProduct, { isLoading }] = useUpsertProductMutation();
  const [deleteImage, { isLoading: isDeletingImage }] =
    useDeleteProductImageMutation();
  const [uploadImage, { isLoading: isUploading }] =
    useUploadProductImageMutation();

  const [img, setImg] = useState();

  const defaultValues = {
    ...product,
    ...props?.defaultValues,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  // Upsert product on form submission.
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const action = upsertProduct(data);
      await action.unwrap();
      close();
    } catch (error) {}
  };

  const handleUploadImage = async (fileUrl) => {
    try {
      const action = uploadImage({ product: defaultValues, fileUrl });
      const result = await action.unwrap();
      setImg(result.image);
      close();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImage = async () => {
    try {
      const action = deleteImage(defaultValues);
      await action.unwrap();
      setImg(null);
      close();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setImg(defaultValues.image);
    reset(defaultValues);
  }, [props]);

  return (
    <Modal scrollable isOpen={isOpen} onClose={close}>
      <Modal.Header>{defaultValues._key ? "Edit" : "Add"} product</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-grid gap-2">
            {defaultValues._key && (
              <>
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
                    disabled={isDeletingImage || !defaultValues.image}
                  >
                    Delete image
                  </button>
                </div>
              </>
            )}
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
            <Form.Field>
              <Form.Field.Label>Price</Form.Field.Label>
              <Form.Field.Input
                type="number"
                step="0.01"
                {...register("price")}
              />
            </Form.Field>
            {!defaultValues._key ? (
              <Form.Field>
                <Form.Field.Label>Section</Form.Field.Label>
                <Form.Field.Select
                  {...register("section")}
                  options={props?.sections}
                  getOptionLabel={(s) => s.title}
                  getOptionValue={(s) => s._key}
                />
              </Form.Field>
            ) : (
              <Form.Field.Input type="hidden" {...register("section")} />
            )}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Form.Button onClick={() => close()}>Dismiss</Form.Button>
        <Form.Submit disabled={isLoading} onClick={handleSubmit(onSubmit)}>
          {isLoading ? "Loading..." : defaultValues._key ? "Edit" : "Add"}
        </Form.Submit>
      </Modal.Footer>
    </Modal>
  );
};

UpsertProductModal.displayName = "UpsertProductModal";

export default UpsertProductModal;
