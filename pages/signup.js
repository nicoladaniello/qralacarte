import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import SignUp from "../components/auth/SignUp";
import useAuth from "../components/auth/useAuth";
import Page from "../components/Page";

const SignUpPage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) router.push("/admin");
  }, [currentUser]);

  return (
    <Page>
      <Head>
        <title>QRalacarte | sign up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="d-flex h-100 bg-light">
        <div className="card m-auto">
          <div className="card-body">
            <h1 className="h3 mb-4">Sign-up to QRalacarte</h1>
            <SignUp className="m-auto" />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SignUpPage;
