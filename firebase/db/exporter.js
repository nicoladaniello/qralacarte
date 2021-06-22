import firebase from "../firebaseAdmin";

var db = firebase.firestore();

async function exporter() {
  const productsRef = db
    .collection("menus")
    .doc("ristorante-laragosta")
    .collection("products")
    .get();
  const sectionsRef = db
    .collection("menus")
    .doc("ristorante-laragosta")
    .collection("sections")
    .get();

  const [productsSnap, sectionsSnap] = await Promise.all([
    productsRef,
    sectionsRef,
  ]);

  const sections = sectionsSnap.docs.reduce((obj, sectionSnap) => {
    obj[sectionSnap.id] = sectionSnap.data();
    return obj;
  }, {});

  const products = productsSnap.docs.reduce((obj, productSnap) => {
    obj[productSnap.id] = productSnap.data();
    return obj;
  }, {});

  const sectionIds = Object.keys(sections).sort(
    (a, b) => sections[a].position - sections[b].position
  );

  sectionIds.forEach((sid) => {
    sections[sid].productIds = Object.keys(products)
      .filter((pid) => products[pid].section === sid)
      .sort((a, b) => products[a].position - products[b].position);

    delete sections[sid].position;
  });

  Object.keys(products).forEach((pid) => {
    delete products[pid].position;
  });

  const json = JSON.stringify({
    sectionIds,
    sections,
    products,
  });

  return json;
}

export default exporter;
