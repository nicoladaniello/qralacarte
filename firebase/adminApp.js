import * as admin from "firebase-admin";
import "firebase/database";

var serviceAccount = require("/Users/Nico/qralacarte/qralacarte-firebase-adminsdk-o1710-c6a967ee8b.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://qralacarte.firebaseio.com",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

export default admin;
