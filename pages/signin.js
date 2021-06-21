import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import SignIn from "../components/auth/SignIn";
import useAuth from "../components/auth/useAuth";
import Page from "../components/Page";

const SignInPage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) router.push("/admin");
  }, [currentUser]);

  return (
    <Page>
      <Head>
        <title>QRalacarte | sign in</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="d-flex h-100 bg-light">
        <div className="card m-auto">
          <div className="card-body">
            <h1 className="h3 mb-4">Sign-in to QRalacarte</h1>
            <SignIn className="m-auto" />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SignInPage;
