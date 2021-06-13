import Image from "next/image";
import React from "react";
import ImageManager from "../../components/common/ImageManager";
import {
  useAddProductImageMutation,
  useDeleteProductImageMutation,
} from "./api";

const ProductImageManager = ({ image, alt, menuId, productId }) => {
  const [addImage, { isLoading: isUploading }] = useAddProductImageMutation();
  const [deleteImage, { isLoading: isDeleting }] =
    useDeleteProductImageMutation();

  const handleUpload = (file) => addImage({ menuId, productId, file });

  const handleDelete = () => deleteImage({ menuId, productId });

  return !!image ? (
    <div
      className="img-thumbnail position-relative w-100 h-100"
      style={{ marginBottom: "66.66%" }}
    >
      <Image layout="fill" objectFit="cover" alt={alt} src={image} />
    </div>
  ) : (
    <ImageManager isLoading={isUploading} onUpload={handleUpload} />
  );
};

export default ProductImageManager;
