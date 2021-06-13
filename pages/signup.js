import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import SignUp from "../components/auth/SignUp";
import useAuth from "../components/auth/useAuth";

const SignUpPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/admin");
  }, [user]);

  return (
    <>
      <Head>
        <title>QRalacarte | sign up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="row no-gutters justify-content-stretch"
        style={{
          height: "100vh",
        }}
      >
        <div className="col-12 col-lg-4 h-100">
          <div className="jumbotron jumbotron-fluid h-100">
            <div className="container">
              <h5>QRalacarte</h5>
              <p className="lead">
                A few clicks away from creating your digital menu.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-8 h-100">
          <div className="container h-100 d-flex">
            <SignUp className="m-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
