import classnames from "classnames";
import firebase from "firebase/app";
import Link from "next/link";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useDispatch } from "react-redux";
import { updateUserAction } from "../../features/users/slice";

const SignIn = ({ className }) => {
  const dispatch = useDispatch();

  // Configure FirebaseUI.
  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/admin",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult) {
        const { uid, displayName, email } = authResult.user;

        dispatch(updateUserAction({ uid, displayName, email }));

        // continue with the redirect.
        return false;
      },
    },
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
      </p>
    </div>
  );
};

export default SignIn;
