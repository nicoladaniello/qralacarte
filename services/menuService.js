import firebase from "../firebase/firebaseClient";
import AppError from "../utils/AppError";

const store = firebase.firestore();
const storage = firebase.storage();
const menuPath = "menus";
const sectionsPath = "sections";
const productsPath = "products";

/**
 * Get a list of menus belonging to a user.
 *
 * @param {string} userId - Required. The user ID.
 * @returns A list of menus.
 * @throws an AppError in case of invalid parameter.
 */
export async function getUserMenus(userId) {
  if (!userId || typeof userId !== "string")
    throw new AppError(AppError.codes.INTERNAL, "Invalid ID provided.");

  const menuSnap = await store
    .collection("menus")
    .where("userId", "==", userId)
    .get();

  const results = menuSnap.docs.map(async (doc) => {
    const infos = await doc.ref.collection("public").doc("info").get();
    return { _key: doc.id, ...doc.data(), ...infos.data() };
  });

  const data = await Promise.all(results);

  return { data };
}

/**
 * Get menu data including its sections and products.
 *
 * @param {string} id - Required. The menu ID.
 * @returns The menu data.
 * @throws an AppError in case of missing parameter.
 */
export async function getFullMenu(id) {
  if (!id) throw new AppError(AppError.codes.INTERNAL, "An ID is required.");

  const menuRef = store.collection("menus").doc(id);
  const menuPromise = menuRef.collection("public").doc("info").get();
  const sectionsPromise = menuRef.collection("sections").get();
  const productsPromise = menuRef.collection("products").get();

  const [menuSnap, sectionsSnap, productsSnap] = await Promise.all([
    menuPromise,
    sectionsPromise,
    productsPromise,
  ]);

  if (!menuSnap.exists)
    throw new AppError(AppError.codes.NOT_FOUND, "Menu not found.");

  const menu = { _key: menuRef.id, ...menuSnap.data() };
  const sections = sectionsSnap.docs.map((doc) => ({
    _key: doc.id,
    _menuKey: id,
    ...doc.data(),
  }));
  const products = productsSnap.docs.map((doc) => ({
    _key: doc.id,
    _menuKey: id,
    ...doc.data(),
  }));

  const data = {
    ...menu,
    sections,
    products,
  };

  return { data };
}

/**
 * Get sections and products of a menu.
 *
 * @param {string} menuId - Required. The menu ID.
 * @returns The sections and products data.
 * @throws an AppError in case of missing parameter.
 */
export async function getMenuSectionsAndProducts(menuId) {
  if (!menuId)
    throw new AppError(AppError.codes.INTERNAL, "An ID is required.");

  const menuRef = store.collection("menus").doc(menuId);
  const sectionsPromise = menuRef.collection("sections").get();
  const productsPromise = menuRef.collection("products").get();

  const [sectionsSnap, productsSnap] = await Promise.all([
    sectionsPromise,
    productsPromise,
  ]);

  const sections = sectionsSnap.docs.map((doc) => ({
    _key: doc.id,
    _menuKey: id,
    ...doc.data(),
  }));
  const products = productsSnap.docs.map((doc) => ({
    _key: doc.id,
    _menuKey: id,
    ...doc.data(),
  }));

  const data = {
    sections,
    products,
  };

  return { data };
}

/**
 * Create a new menu.
 *
 * @param {object} data - Required. The menu data. Must include userId and slug fields.
 * @returns The created menu object.
 * @throws an AppError in case of invalid parameter.
 */
export async function createMenu(data) {
  if (!data || !data.userId || !data.slug)
    throw new AppError(AppError.codes.INTERNAL, "Invalid data parameter.");

  const { userId, slug, ...info } = data;

  const menuRef = store.collection(menuPath).doc(slug);

  await menuRef.set({ userId }, { merge: true });
  await menuRef.collection("public").doc("info").set(info);

  return { data: { _key: menuRef.id, ...data } };
}

/**
 * Update a menu or create a new menu if not exists.
 *
 * @param {object} data - Required. The menu data.
 * @returns The same menu data provided with a _key field.
 * @throws an AppError in case of missing parameter.
 */
export async function updateMenuInfo(data) {
  if (!data || !data._key)
    throw new AppError(AppError.codes.INTERNAL, "Invalid data provided.");

  // IMPORTANT: Remove sections and products from data before saving
  const { _key, sections, products, ...menu } = data;

  const ref = store
    .collection(menuPath)
    .doc(_key)
    .collection("public")
    .doc("info");

  await ref.set(menu, { merge: true });

  return { data: { _key, ...menu } };
}

/**
 * Upload/replace a menu image. If the menu doesn't exists it creates a new one.
 *
 * @param {object} menu - Required. The menu object. Must include a _key field.
 * @param {string} fileUrl - Required. The file URL.
 * @returns The menu data.
 */
export async function uploadMenuImage(menu, fileUrl) {
  if (!menu || !menu._key || !fileUrl)
    throw new AppError(AppError.codes.INTERNAL, "Invalid parameters provided.");

  let image;

  // First upload image...
  try {
    const blob = await fetch(fileUrl).then((r) => r.blob());

    const upload = await storage
      .ref(menuPath)
      .child(menu._key)
      .child("cover.jpg")
      .put(blob);

    image = await upload.ref.getDownloadURL();
  } catch (error) {
    throw new AppError(AppError.codes.INTERNAL, error.message);
  }

  //... Then insert image URL in document.
  await store
    .collection(menuPath)
    .doc(menu._key)
    .collection("public")
    .doc("info")
    .update({ image }, { merge: true });

  const data = { _key: menu._key, image };
  return { data };
}

/**
 * Delete a menu image.
 *
 * @param {object} menu - Required. The menu object. Must include a _key field.
 */
export async function deleteMenuImage(menu) {
  if (!menu || !menu._key)
    throw new AppError(AppError.codes.INTERNAL, "Invalid menu provided.");

  const menuRef = store
    .collection(menuPath)
    .doc(menu._key)
    .collection("public")
    .doc("info");

  await storage.ref(menuPath).child(menu._key).child("cover.jpg").delete();
  await menuRef.update({ image: null }, { merge: true });

  return { data: {} };
}

/**
 * Update a section or create a new one if not exists.
 *
 * @returns The same section data provided with a _key field.
 * @throws an AppError in case of missing or invalid parameters.
 */
export async function upsertSection(data) {
  if (!data || !data._menuKey)
    throw new AppError(AppError.codes.INTERNAL, "data is invalid.");

  const { _key, _menuKey, ...section } = data;

  const menuRef = store.collection(menuPath).doc(_menuKey);
  const menuInfoRef = menuRef.collection("public").doc("info");
  const sectionRef = menuRef
    .collection(sectionsPath)
    .doc(_key ? _key : undefined);

  if (!data._key) {
    // New insertion: add the section ID to the menu section IDs field.
    const menuInfoSnap = await menuInfoRef.get();
    const menuInfo = menuInfoSnap.data();
    const sectionIds = menuInfo.sectionIds
      ? [...menuInfo.sectionIds, sectionRef.id]
      : [sectionRef.id];

    // Batch all operations
    const batch = store.batch();
    batch.set(sectionRef, section, { merge: true });
    batch.update(menuInfoRef, { sectionIds });
    await batch.commit();
  } else {
    // Just an update, no need to edit menu.
    await sectionRef.set(section, { merge: true });
  }

  return { data: { _key: sectionRef.id, _menuKey, ...section } };
}

/**
 * Delete a section.
 *
 * @param {object} section - Required. The section to delete.
 * @throws an AppError in case of missing parameter.
 */
export async function deleteSection(section) {
  if (!section || !section._menuKey || !section._key)
    throw new AppError(AppError.codes.INTERNAL, "Given section is invalid.");

  const menuRef = store.collection(menuPath).doc(section._menuKey);
  const menuInfoRef = menuRef.collection("public").doc("info");
  const sectionRef = menuRef.collection(sectionsPath).doc(section._key);

  // Get menu section IDs to remove the current section ID.
  const menuInfoSnap = await menuInfoRef.get();
  const menuInfo = menuInfoSnap.data();

  let sectionIds = menuInfo.sectionIds ? [...menuInfo.sectionIds] : [];
  sectionIds.splice(sectionIds.indexOf(sectionRef.id), 1);

  // Batch all operations
  const batch = store.batch();
  batch.delete(sectionRef);
  batch.update(menuInfoRef, { sectionIds });
  await batch.commit();

  return { data: {} };
}

/**
 * Update a product or create a new one if not exists.
 *
 * @param {object} data - Required. The product data, it must include a _menuKey field.
 * @returns The same product data provided with a _key field.
 * @throws an AppError in case of missing or invalid parameters.
 */
export async function upsertProduct(data) {
  if (!data || !data._menuKey || !data.section)
    throw new AppError(AppError.codes.INTERNAL, "data is invalid.");

  const { _key, _menuKey, ...product } = data;

  const menuRef = store.collection(menuPath).doc(_menuKey);
  const sectionRef = menuRef.collection(sectionsPath).doc(product.section);
  const productRef = menuRef
    .collection(productsPath)
    .doc(_key ? _key : undefined);

  if (!data._key) {
    // New insertion: add the product ID to the section product IDs.
    const sectionSnap = await sectionRef.get();
    const section = sectionSnap.data();
    const productIds = section.productIds
      ? [...section.productIds, productRef.id]
      : [productRef.id];

    // Batch all operations
    const batch = store.batch();
    batch.set(productRef, product, { merge: true });
    batch.update(sectionRef, { productIds });
    await batch.commit();
  } else {
    // Just an update, no need to edit section.
    productRef.set(product, { merge: true });
  }

  return { data: { _key: productRef.id, _menuKey, ...product } };
}

/**
 * Delete a product.
 *
 * @param {object} product - Required. The product to delete.
 * @throws an AppError in case of missing parameter.
 */
export async function deleteProduct(product) {
  if (!product || !product._menuKey || !product._key || !product.section)
    throw new AppError(AppError.codes.INTERNAL, "Given product is invalid.");

  const menuRef = store.collection(menuPath).doc(product._menuKey);
  const sectionRef = menuRef.collection(sectionsPath).doc(product.section);
  const productRef = menuRef.collection(productsPath).doc(product._key);

  // Get menu section IDs to remove the current section ID.
  const sectionSnap = await sectionRef.get();
  const section = sectionSnap.data();

  let productIds = section.productIds ? [...section.productIds] : [];
  productIds.splice(productIds.indexOf(productRef.id), 1);

  // Batch all operations
  const batch = store.batch();
  batch.delete(productRef);
  batch.update(sectionRef, { productIds });
  await batch.commit();

  return { data: {} };
}

/**
 * Upload/replace a product image. If the product doesn't exists it creates a new one.
 *
 * @param {object} product - Required. The product object. Must include a _menuKey field.
 * @param {string} fileUrl - Required. The file URL.
 * @returns The product data.
 * @throws an AppError in case of missing or invalid parameters.
 */
export async function uploadProductImage(product, fileUrl) {
  if (!product || !product._menuKey || !fileUrl)
    throw new AppError(AppError.codes.INTERNAL, "Invalid parameters.");

  const productRef = store
    .collection(menuPath)
    .doc(product._menuKey)
    .collection(productsPath)
    .doc(product._key);

  const imageRef = storage
    .ref(menuPath)
    .child(product._menuKey)
    .child(productsPath)
    .child(product._key)
    .child("profile.jpg");

  let image;

  // First upload image...
  try {
    const blob = await fetch(fileUrl).then((r) => r.blob());
    const upload = await imageRef.put(blob);
    image = await upload.ref.getDownloadURL();
  } catch (error) {
    throw new AppError(AppError.codes.INTERNAL, "Error while uploading image.");
  }

  //... Then insert image URL in document.
  await productRef.set({ image }, { merge: true });

  const data = { _key: productRef.id, image };
  return { data };
}

/**
 * Delete a product image.
 *
 * @param {object} product - Required. The product object. Must include _menuKey and _key fields.
 * @throws an AppError in case of missing or invalid parameters.
 */
export async function deleteProductImage(product) {
  if (!product || !product._menuKey || !product._key)
    throw new AppError(AppError.codes.INTERNAL, "Invalid parameters.");

  const productRef = store
    .collection(menuPath)
    .doc(product._menuKey)
    .collection(productsPath)
    .doc(product._key);

  const imageRef = storage
    .ref(menuPath)
    .child(product._menuKey)
    .child(productsPath)
    .child(product._key)
    .child("profile.jpg");

  await imageRef.delete();
  await productRef.update({ image: null }, { merge: true });

  return { data: {} };
}
