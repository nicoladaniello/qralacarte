import firebase from "../firebase/firebaseClient";

export function signOut() {
  return firebase.auth().signOut();
}

export function onAuthStateChanged(user, error) {
  return firebase.auth().onAuthStateChanged(user, error);
}
