import firebase from "../firebaseClient";

var db = firebase.firestore();

async function exportMenu(slug) {
  const menuRef = db.collection("menus").doc(slug);

  const menuInfoPromise = menuRef.collection("public").doc("info").get();
  const productsPromise = menuRef.collection("products").get();
  const sectionsPromise = menuRef.collection("sections").get();

  const [menuInfoSnap, productsSnap, sectionsSnap] = await Promise.all([
    menuInfoPromise,
    productsPromise,
    sectionsPromise,
  ]);

  const menuInfo = menuInfoSnap.data();

  const sections = sectionsSnap.docs.reduce((obj, sectionSnap) => {
    obj[sectionSnap.id] = sectionSnap.data();
    return obj;
  }, {});

  const products = productsSnap.docs.reduce((obj, productSnap) => {
    obj[productSnap.id] = productSnap.data();
    return obj;
  }, {});

  const json = JSON.stringify({
    menu: {
      ...menuInfo,
      sections,
      products,
    },
  });

  return json;
}

export default exportMenu;
