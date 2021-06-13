import firebase from "../firebaseClient";
import products from "./products.json";

var db = firebase.firestore();

function importer() {
  products.forEach(function (product) {
    db.collection("menus")
      .doc("ristorante-laragosta")
      .collection("products")
      .add(product)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  });
}

export default importer;
