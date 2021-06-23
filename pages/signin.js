import firebase from "firebase/app";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useDispatch } from "react-redux";
import Alert from "../components/Alert";
import Page from "../components/Page";
import useAuth from "../features/auth/useAuth";
import { restoreDeveloperAccount } from "../features/development/slice";

const SignInPage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  // Configure FirebaseUI.
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult) {
        console.log("NEXT_PUBLIC_DEVELOPMENT", process.env.NEXT_PUBLIC_DEVELOPMENT);
        if (process.env.NEXT_PUBLIC_DEVELOPMENT) {
          console.log("restoreDeveloperAccount");
          dispatch(restoreDeveloperAccount());
        }

        const { uid, displayName, email } = authResult.user;
        dispatch(updateUserAction({ uid, displayName, email }));

        // stop the redirect
        return false;
      },
    },
  };

  useEffect(() => {
    if (currentUser) router.push("/admin");
  }, [currentUser, router]);

  return (
    <Page title="Sign in">
      <div className="row g-0 h-100 align-items-stretch bg-white">
        <div className="col-sm-5 d-none d-sm-block">
          <div className="position-relative h-100">
            <Image
              alt="Sign in"
              src="/images/illustrations/app.svg"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="col-sm-7 p-lg-4 d-flex">
          <div className="m-auto text-center">
            <h1 className="mb-4">Sign-in or Register.</h1>
            <div className="mb-4">
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
            {process.env.NEXT_PUBLIC_DEVELOPMENT && (
              <Alert info className="text-start small">
                <h6 className="alert-heading">
                  Welcome to the development instance!
                </h6>
                Try out a pre-made account by signing in with{" "}
                <b>develop@qralacarte.com</b>
                <br />
                and <b>password</b> as credentials.
              </Alert>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SignInPage;
