const functions = require("firebase-functions");
const admin = require("firebase-admin");

const db = admin.firestore();
const storage = admin.storage().bucket();
const auth = admin.auth();

exports.restoreDeveloperAccount = functions.https.onCall(
  async (data, context) => {
    const accountUid = (await auth.getUserByEmail("develop@qralacarte.com"))
      .uid;

    if (!accountUid)
      throw new functions.https.HttpsError(
        "internal",
        "The test user account was not found."
      );

    const uid = context.auth.uid;

    if (accountUid !== uid)
      throw new functions.https.HttpsError(
        "permission-denied",
        "Permission denied."
      );

    const menuId = "osteria-luigi";

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

    return {
      success: true,
      menuId,
    };
  }
);

/**
 * Restore a menu from a backup location.
 *
 * @param {*} menuId - Required. The menu ID.
 * @returns A promise of firestore.writeResult.
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
 * @param {*} menuId - Required. The menu ID.
 * @returns A promise of firestore.writeResult.
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
 * @param {*} menuId - Required. The menu ID.
 * @returns A promise of firestore.writeResult.
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
