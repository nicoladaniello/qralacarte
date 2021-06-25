const functions = require("firebase-functions");
const admin = require("firebase-admin");

const db = admin.firestore();
const storage = admin.storage().bucket();
const auth = admin.auth();

DEVELOPER_ACCOUNT = "develop@qralacarte.com";
DEVELOPER_ACCOUNT_MENU = "osteria-luigi";

exports.restoreDeveloperAccount = functions.https.onCall(
  async (data, context) => {
    const devAccountId = (await auth.getUserByEmail(DEVELOPER_ACCOUNT)).uid;
    const uid = context.auth.uid;
    const menuId = DEVELOPER_ACCOUNT_MENU;

    if (!devAccountId)
      throw new functions.https.HttpsError(
        "internal",
        "The test user account was not found."
      );

    if (devAccountId !== uid)
      throw new functions.https.HttpsError(
        "permission-denied",
        "Permission denied."
      );

    try {
      await restoreMenuDataFromBackup(menuId);
    } catch (error) {
      throw new functions.https.HttpsError(
        "internal",
        "An error occurred while restoring the menu data."
      );
    }

    try {
      await restoreImagesFromBackup(menuId);
    } catch (error) {
      throw new functions.https.HttpsError(
        "internal",
        "An error occurred while restoring the menu images."
      );
    }

    try {
      await deleteUserMenusExcept(devAccountId, menuId);
    } catch (error) {
      throw new functions.https.HttpsError(
        "internal",
        "An error occurred while deleting user menus."
      );
    }

    return {
      success: true,
      menuId,
    };
  }
);

/**
 * Restore a menu from a backup location.
 *
 * @param {string} menuId - Required. The menu ID.
 * @returns A promise of firestore.WriteResult
 */
async function restoreMenuDataFromBackup(menuId) {
  const menuRef = db.collection("menus").doc(menuId);
  const menuInfoRef = menuRef.collection("public").doc("info");
  const sectionsRef = menuRef.collection("sections");
  const productsRef = menuRef.collection("products");

  const backupFile = await storage.file(
    `backups/sandbox/menus/${menuId}/menu.json`
  );
  const buffer = (await backupFile.download())[0];
  const data = JSON.parse(buffer.toString());

  const { sections, products, ...infos } = data.menu;

  const batch = db.batch();

  // Set batch ops
  batch.set(menuInfoRef, infos);
  Object.keys(sections).map((key) =>
    batch.set(sectionsRef.doc(key), sections[key])
  );
  Object.keys(products).map((key) =>
    batch.set(productsRef.doc(key), products[key])
  );

  return batch.commit();
}

/**
 * Copies all files from menus/[menuId] to backups/sandbox
 *
 * @param {string} menuId - Required. The menu ID.
 * @returns A promise of firestore.WriteResult
 */
async function copyImagesToBackup(menuId) {
  const backupFolder = "backups/sandbox/";
  const menuFolder = `menus/${menuId}/`;

  const files = await storage.getFiles({ prefix: menuFolder });

  const copyFilesPromises = files[0]
    .filter((f) => f.name.endsWith(".jpg"))
    .map((file) => file.copy(`${backupFolder}${file.name}`));

  const results = await Promise.all(copyFilesPromises);

  const copiedFileNames = results.map((res) => res[0].name);
  return copiedFileNames;
}

/**
 * Copies all files from backups/sandbox/menus/[menuId] to menus/[menuId]
 *
 * @param {string} menuId - Required. The menu ID.
 * @returns A promise of firestore.WriteResult
 */
async function restoreImagesFromBackup(menuId) {
  const backupFolder = "backups/sandbox/";
  const menuFolder = `menus/${menuId}/`;

  const files = await storage.getFiles({ prefix: backupFolder + menuFolder });

  const copyFilesPromises = files[0]
    .filter((f) => f.name.endsWith(".jpg"))
    .map((file) => file.copy(file.name.replace(backupFolder, "")));

  const results = await Promise.all(copyFilesPromises);

  const copiedFileNames = results.map((res) => res[0].name);
  return copiedFileNames;
}

/**
 * Deletes all user menus except the given one.
 *
 * @param {string} menuId - Required. The menu ID.
 * @param {string} uid - Required. The user ID.
 * @returns A promise of firestore.WriteResult
 */
async function deleteUserMenusExcept(uid, menuId) {
  // Find all user menus
  const userMenus = await db
    .collection("menus")
    .where("userId", "==", uid)
    .get();

  const menusToDelete = userMenus.docs.filter((doc) => doc.id !== menuId);

  const batch = db.batch();

  menusToDelete.forEach((doc) => batch.delete(doc.ref));

  return batch.commit();
}
