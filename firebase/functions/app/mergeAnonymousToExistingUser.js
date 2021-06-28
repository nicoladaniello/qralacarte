const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (admin.apps.length === 0) {
  admin.initializeApp();
}

/**
 * Endpoint to merge an anonymous user account with that one of an existing user.
 */
exports.mergeAnonymousToExistingUser = functions.https.onCall(
  async (anonymousIdToken, context) => {
    // Verify anonymous ID token and get user ID
    const { uid: anonUserId } = await admin
      .auth()
      .verifyIdToken(anonymousIdToken);

    // Get currently logged in user ID
    const currentUserId = context.auth.uid;

    // Get anonymous user data
    const menus = await admin
      .firestore()
      .collection("menus")
      .where("userId", "==", anonUserId)
      .get();

    const batch = admin.firestore().batch();

    // Update anonymous user menus owner to the current user
    menus.docs.forEach((doc) =>
      batch.update(doc.ref, { userId: currentUserId })
    );

    try {
      await batch.commit();
    } catch (error) {
      throw new functions.https.HttpsError(
        "internal",
        "An error occurred while merging users."
      );
    }

    try {
      await admin.auth().deleteUser(anonUserId);
    } catch (error) {
      throw new functions.https.HttpsError(
        "internal",
        "An error occurred while deleting anonymous user."
      );
    }

    return {
      success: true,
    };
  }
);
