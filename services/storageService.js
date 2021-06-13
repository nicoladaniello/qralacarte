import firebase from "../firebase/firebaseClient";
import AppError from "../utils/AppError";

const storage = firebase.storage();

/**
 * Asynchronous function to get an file URL from storage.
 *
 * @param {string} path - Required. The resource path.
 * @returns The file URL.
 */
const get = async (path) => {
  const url = await storage.ref(path).getDownloadURL();
  return url;
};

/**
 * Asynchronous function to upload a file to storage.
 *
 * @param {string} path - Required. The resource path.
 * @param {string} file - Required. The file to upload.
 * @returns The file URL string.
 */
const upload = async (path, file, metadata) => {
  // const metadata = {
  //   contentType: "image/jpeg",
  // };

  const snap = await storage.ref(path).put(file, metadata);
  const url = await snap.ref.getDownloadURL();

  return url;
};

/**
 * Asynchronous function to remove a file from storage.
 *
 * @param {string} path - Required. The resource path.
 */
const remove = async (path) => {
  try {
    await storage.ref(path).delete();
  } catch (error) {
    if (error.code === "storage/object-not-found")
      throw new AppError(AppError.codes.NOT_FOUND, "Image not found!");

    throw error;
  }
};

const storageService = {
  get,
  upload,
  remove,
};

export default storageService;
