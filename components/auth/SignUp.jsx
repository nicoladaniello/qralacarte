import classnames from "classnames";
import firebase from "firebase/app";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const SignUp = ({ className }) => {
  const router = useRouter();

  // Configure FirebaseUI.
  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/admin",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult) => {
        // Upsert user details
        const { uid, displayName, email } = authResult.user;
        firebase.database().ref(`users/${uid}`).set({ email, displayName });
        router.push("/admin");
      },
    },
  };

  return (
    <div className={classnames("text-center", className)}>
      <h1 className="h3">Sign-up to QRalacarte</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <hr />
      <p className="mb-2 text-muted">
        Already have an account?{" "}
        <Link href="/signin">
          <a>Sign in</a>
        </Link>
        .
      </p>
    </div>
  );
};

export default SignUp;
