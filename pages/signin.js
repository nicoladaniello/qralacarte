import firebase from "firebase/app";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useDispatch } from "react-redux";
import Alert from "../components/Alert";
import Page from "../components/Page";
import { restoreDeveloperAccount } from "../features/development/slice";
import { useMergeAnonymousToExistingUserMutation } from "../features/users/api";

const SignInPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [mergeAnonymousToExistingUser] =
    useMergeAnonymousToExistingUserMutation();

  // Configure FirebaseUI.
  const uiConfig = {
    signInFlow: "popup",
    autoUpgradeAnonymousUsers: true,
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult) {
        console.log(authResult.user.email);

        if (
          process.env.NEXT_PUBLIC_DEVELOPMENT &&
          authResult.user.email === process.env.NEXT_PUBLIC_DEVELOPER_ACCOUNT
        ) {
          console.log("restoring dev account");
          dispatch(restoreDeveloperAccount());
        }

        router.push("/admin");

        // stop the redirect
        return false;
      },
      // signInFailure callback must be provided to handle merge conflicts which
      // occur when an existing credential is linked to an anonymous user.
      signInFailure: async (error) => {
        if (error.code !== "firebaseui/anonymous-upgrade-merge-conflict") {
          return Promise.resolve();
        }

        try {
          await mergeAnonymousToExistingUser(error.credential).unwrap();
          router.push("/admin");
        } catch (error) {}
      },
    },
  };

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
            <Alert developmentOnly info className="text-start small">
              <h6 className="alert-heading">Development instance notice</h6>
              Sign in by email and password using{" "}
              <strong>
                {process.env.NEXT_PUBLIC_DEVELOPER_ACCOUNT}
              </strong> and <strong>password</strong> as credentials to try a
              pre-made account.
            </Alert>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SignInPage;
