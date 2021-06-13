import firebase from "../firebase/firebaseClient";

const db = firebase.firestore();

/**
 * Get the user data.
 *
 * @param {object} uid - The user id.
 * @returns the user data.
 */
export async function getUser(uid) {
  const snap = await db.collection("users").doc(uid).get();
  return snap.data();
}

/**
 *
 * @param {object} user - The user data to update. Must include the uid.
 * @returns
 */
export function updateUser(user) {
  console.log("updating user...", user);
  const { uid, ...rest } = user;
  return db.collection("users").doc(uid).set(rest, { merge: true });
}
