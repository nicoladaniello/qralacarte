import firebase from "../firebaseAdmin";
import aragosta from "./db-aragosta-22-07-22.json";

var db = firebase.firestore();

async function importer() {
  const menuRef = db.collection("menus").doc("ristorante-laragosta");
  const infoRef = menuRef.collection("public").doc("info");
  const sectionsRef = menuRef.collection("sections");
  const productsRef = menuRef.collection("products");

  const infoPromise = infoRef.set(
    { sectionIds: aragosta.sectionIds },
    { merge: true }
  );

  const sectionPromises = Object.keys(aragosta.sections).map((sid) =>
    sectionsRef.doc(sid).set(aragosta.sections[sid])
  );

  const productsPromises = Object.keys(aragosta.products).map((pid) =>
    productsRef.doc(pid).set(aragosta.products[pid])
  );

  await Promise.all([infoPromise, ...sectionPromises, ...productsPromises]);
}

export default importer;
