import firebase from "../firebase/firebaseClient";
import AppError from "../utils/AppError";

const db = firebase.firestore();

/**
 * Asynchronous function to get a single resource.
 *
 * @param {string} path - Required. The resource path.
 * @param {string} key - Required. The resource key.
 * @returns The resource object.
 * @throws an AppError with code NOT_FOUND if nothing was found.
 */
const get = async (path, key) => {
  const snap = await db.collection(path).doc(key).get();
  if (snap.exists) return { data: { _key: snap.id, ...snap.data() } };
  throw new AppError(AppError.codes.NOT_FOUND, "Resource not found.");
};

/**
 * Asynchronous function to get a list of resources.
 *
 * @param {string} path - Required. The resource path.
 * @param {object} options - Optional options.
 * @param {object} options.where - Set a condition to the query. Form: { field, op, value }
 * @param {object} options.orderBy - Optional. Order results, form: { field, dir }
 * @returns - An array of resources. An empty array if nothing was found.
 */
const getAll = async (path, options) => {
  const { where, orderBy } = options || {};
  const ref = db.collection(path);

  if (where) {
    const [field, op, value] = where;
    ref.where(field, op, value);
  }

  if (orderBy) {
    const { field, dir } = orderBy;
    ref.orderBy(field, dir);
  }

  const snap = await ref.get();
  const data = [];

  snap.forEach((doc) => {
    data.push({ _key: doc.id, ...doc.data() });
  });

  return { data };
};

/**
 * Asynchronous function to insert a new entity.
 *
 * @param {string} path - Required. The resource path.
 * @param {object} data - Requred. The resource data. If includes a _key field, it will be removed.
 * @returns The newly created entity including its _key field.
 */
const insert = async (path, data) => {
  const { _key, ...rest } = data;

  const snap = await db.collection(path).add(rest);
  return { data: { _key: snap.id, data } };
};

/**
 * Function to update an entity.
 *
 * @param {string} path - Required. The resource path.
 * @param {object} data - Requred. The resource data. Must include a _key field.
 * @returns A promise that will resolve once the upsert is done.
 * @throws An error if the entity doesn't exist.
 */
const update = async (path, data) => {
  const { _key, ...rest } = data;

  if (!_key)
    throw new AppError(AppError.codes.INTERNAL, "Missing _key parameter.");

  await db.collection(path).doc(_key).update(rest);
  return { data };
};

/**
 * Function to update an entity, or create a new one if doesn't exists.
 *
 * If the data content includes a _key field, it will be used as document reference.
 *
 * @param {string} path - Required. The resource path.
 * @param {object} data - Requred. The resource data.
 * @returns A promise that will resolve once the upsert is done.
 */
const upsert = async (path, data) => {
  const { _key, ...rest } = data;

  const ref = db.collection(path).doc(_key ? _key : undefined);
  await ref.set(rest, { merge: true });

  return { data: { _key: ref.id, ...rest } };
};

/**
 * Remove an entity.
 *
 * @param {string} path - Required. The entity path.
 * @param {string} data - Required. The entity data. Must include the _key field.
 */
const remove = async (path, data) => {
  if (!data._key)
    throw new AppError(AppError.codes.INTERNAL, "Missing _key parameter.");
  await db.collection(path).doc(data._key).delete();
  return { data: { success: true } };
};

const generateId = (path) => {
  const ref = db.collection(path).doc();
  return ref.id;
};

// API
const apiService = {
  get,
  getAll,
  insert,
  update,
  upsert,
  remove,
  generateId,
};

export default apiService;
