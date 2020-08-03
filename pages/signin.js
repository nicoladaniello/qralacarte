import React from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";

const SignIn = () => {
  return (
    <Layout>
      <Head>
        <title>QRalacarte | sign in</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container-fluid px-0 mb-3 mb-lg-5">
        <div className="card border-0">
          <div className="row no-gutters">
            <div className="col-12 col-lg-4 align-self-stretch">
              <div className="jumbotron jumbotron-fluid h-100"></div>
            </div>
            <div className="col-12 col-lg-8">
              <div className="container px-lg-5 py-lg-3">
                <h1 className="mb-1">Sign in to QRalacarte</h1>
                <p className="mb-2 text-muted">
                  Don't have an account?{" "}
                  <Link href="/signup">Sign up here</Link>.
                </p>
                <p className="font-weight-bold border-bottom">Sign in with:</p>
                <p className="w-75 mb-lg-3">
                  <a href="/" className="btn btn-danger btn-block">
                    Sign in with Google
                  </a>
                  <a href="/" className="btn btn-info btn-block">
                    Sign in with Facebook
                  </a>
                </p>
                <p className="font-weight-bold border-bottom">
                  Or enter you details:
                </p>
                <form className="row">
                  <div className="form-group col-12">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="form-group col-12">
                    <label htmlFor="email">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                    />
                  </div>
                  <div className="col-12">
                    <button type="submit" class="btn btn-primary">
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
