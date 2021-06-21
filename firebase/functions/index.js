const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

const menuPath = "menus";
const sectionsPath = "sections";
const productsPath = "products";

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.deleteSection = functions.firestore
  .document(`${menuPath}/{menuID}/${sectionsPath}/{sectionID}`)
  .onDelete((snap, context) => {
    // Delete all products under the deleted section.
    const sectionProductsRef = db
      .collection(menuPath)
      .doc(context.params.menuID)
      .collection(productsPath)
      .where("section", "==", snap.id);

    return sectionProductsRef.get().then((products) => {
      const batch = db.batch();
      products.forEach((doc) => batch.delete(doc.ref));
      return batch.commit();
    });
  });
