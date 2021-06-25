const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();
const storage = admin.storage().bucket();

const menuPath = "menus";

exports.onMenuDelete = functions.firestore
  .document(`${menuPath}/{menuID}`)
  .onDelete((snap, context) => {
    const { menuID } = context.params;

    // Delete all images under that menu
    return storage.deleteFiles({ prefix: `${menuPath}/${menuID}/` });
  });
