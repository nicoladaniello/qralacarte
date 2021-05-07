import classnames from "classnames";
import firebase from "firebase/app";
import Link from "next/link";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const SignIn = ({ className }) => {
  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /admin after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/admin",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };

  return (
    <div className={classnames("text-center", className)}>
      <h1 className="h3">Sign-in to QRalacarte</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <hr />
      <p className="mb-2 text-muted">
        Don't have an account?{" "}
        <Link href="/signup">
          <a>Sign up</a>
        </Link>
        .
      </p>{" "}
    </div>
  );
};

export default SignIn;
