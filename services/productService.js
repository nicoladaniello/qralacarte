import AppError from "../utils/AppError";
import apiService from "./apiService";
import storageService from "./storageService";

const getPath = (menuId) => `menus/${menuId}/products`;
const getImagePath = (menuId, productId) =>
  `menus/${menuId}/products/${productId}.jpg`;

/**
 * Add or replace an image to a product.
 *
 * @param {string} menuId - Required. The menu ID.
 * @param {string} productId - Required. The produt ID.
 * @param {string} fileUrl - Required. The URL of the image to upload.
 */
const addImage = async (menuId, productId, fileUrl) => {
  const blob = await fetch(fileUrl).then((r) => r.blob());

  const image = await storageService.upload(
    getImagePath(menuId, productId),
    blob
  );
  URL.revokeObjectURL(fileUrl);
  return apiService.update(getPath(menuId), { _key: productId, image });
};

/**
 * Delete an image from a product.
 *
 * @param {string} menuId - Required. The menu ID.
 * @param {string} productId - Required. The produt ID.
 */
const deleteImage = async (menuId, productId) => {
  await storageService.remove(getImagePath(menuId, productId));
  return apiService.update(getPath(menuId), { image: null });
};

// Handle image deletion on product removal.
const remove = async (menuId, product) => {
  console.log(menuId, product);
  try {
    if (product.image)
      await storageService.remove(getImagePath(menuId, product._key));
  } catch (error) {
    // If the image doesn't exist just let go..
    if (error.code !== AppError.codes.NOT_FOUND) throw error;
  }

  return apiService.remove(getPath(menuId), product);
};

// API
const productService = {
  get: (menuId, key) => apiService.get(getPath(menuId), key),
  getAll: (menuId, options) => apiService.getAll(getPath(menuId), options),
  insert: (menuId, product) => apiService.insert(getPath(menuId), product),
  update: (menuId, product) => apiService.update(getPath(menuId), product),
  upsert: (menuId, product) => apiService.upsert(getPath(menuId), product),
  remove,
  addImage,
  deleteImage,
};

export default productService;
