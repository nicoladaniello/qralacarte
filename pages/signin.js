import firebase from "firebase/app";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useDispatch } from "react-redux";
import Page from "../components/Page";
import useAuth from "../features/auth/useAuth";

const SignInPage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
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

  useEffect(() => {
    if (currentUser) router.push("/admin");
  }, [currentUser, router]);

  return (
    <Page>
      <Head>
        <title>QRalacarte | sign in</title>
      </Head>
      <div className="d-flex h-100">
        <div className="card m-auto">
          <div className="card-body">
            <h1 className="h3 mb-4">Sign-in to QRalacarte</h1>
            <div className={"text-center m-auto"}>
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
              <hr />
              <p className="mb-2 text-muted">
                Don't have an account?{" "}
                <Link href="/signup">
                  <a>Sign up</a>
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SignInPage;
