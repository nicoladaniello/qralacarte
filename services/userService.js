import { unwrapResult } from "@reduxjs/toolkit";
import { restoreDeveloperAccount } from "../features/development/slice";
import firebase from "../firebase/firebaseClient";
import store from "../store";

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

/**
 * Sign in user anonymously.
 */
export async function signInAnonymously() {
  const cred = await firebase.auth().signInAnonymously();

  return {
    data: { uid: cred.user.uid },
  };
}

/**
 * Sign in user with credential.
 */
export async function signInWithCredential(credential) {
  const userCred = await firebase.auth().signInWithCredential(credential);
  const appUser = {
    displayName: userCred.user.displayName,
    email: userCred.user.email,
    uid: userCred.user.uid,
  };
  return { data: appUser };
}

/**
 * @returns a Promise containing the ID token
 */
export function getCurrentUserIdToken() {
  return firebase.auth().currentUser.getIdToken();
}

/**
 * Merge an anonymous user account to that one of an existing user.
 *
 * The user must be signed in with the anonymous account and pass the
 * existing user credential to this function to sign in and merge the accounts.
 *
 * @param {object} authCredential - Required. The auth credential.
 */
export async function mergeAnonymousToExistingUser(authCredential) {
  const anonymousUserIdToken = await firebase.auth().currentUser.getIdToken();

  const userCredential = await firebase
    .auth()
    .signInWithCredential(authCredential);

  if (
    process.env.NEXT_PUBLIC_DEVELOPMENT &&
    userCredential.user.email === process.env.NEXT_PUBLIC_DEVELOPER_ACCOUNT
  ) {
    console.log("restoring dev account");
    await store.dispatch(restoreDeveloperAccount());
    console.log("dev account restored");
  }

  console.log("Merging account");

  const merge = firebase
    .functions()
    .httpsCallable("mergeAnonymousToExistingUser");

  await merge(anonymousUserIdToken);

  console.log("account merged, invalidating menus");

  

  return { data: {} };
}
