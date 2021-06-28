/**
 * Handle menu deletion side effects.
 * 
 * Current side effects:
 * 
 *  - Delete all menu images from storage.
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const storage = admin.storage().bucket();

const menuPath = "menus";

exports.onMenuDelete = functions.firestore
  .document(`${menuPath}/{menuID}`)
  .onDelete((snap, context) => {
    const { menuID } = context.params;

    // Delete all images under that menu
    return storage.deleteFiles({ prefix: `${menuPath}/${menuID}/` });
  });
