import React from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";

const SecondPage = () => {
  return (
    <Layout>
      <Head>
        <title>QRalacarte | sign in</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container-fluid px-0 mb-3 mb-lg-5">
        <div className="card border-0">
          <div className="row no-gutters">
            <div className="col-12 col-xl-4 align-self-stretch">
              <div className="jumbotron rounded-0 h-100">
                <h2 className="text-muted mt-3">
                  The best online menu for you customers
                </h2>
                <p className="lead text-muted">
                  sign up free and get your QR code now.
                </p>
              </div>
            </div>
            <div className="col-12 col-xl-8">
              <div className="container px-lg-5 py-3">
                <h1 className="h3 mb-1">Sign up to QRalacarte</h1>
                <p className="mb-2 text-muted">
                  Already have an account?{" "}
                  <Link href="/signin">Sign in here</Link>.
                </p>
                <p className="font-weight-bold border-bottom">Sign up with:</p>
                <p className="w-75 mb-lg-3">
                  <a href="/" className="btn btn-danger btn-block">
                    Sign up with Google
                  </a>
                  <a href="/" className="btn btn-info btn-block">
                    Sign up with Facebook
                  </a>
                </p>
                <p className="font-weight-bold border-bottom">
                  Or register here:
                </p>
                <form className="row">
                  <div className="form-group col-12">
                    <label htmlFor="company">Company name</label>
                    <input type="text" className="form-control" id="company" />
                  </div>
                  <div className="form-group col-12">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="form-group col-12 col-lg-6">
                    <label htmlFor="email">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                    />
                  </div>
                  <div className="form-group col-12 col-lg-6">
                    <label htmlFor="password-confirm">Confirm password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password-confirm"
                    />
                  </div>
                  <div class="form-group form-check col-12 pl-lg-2">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="terms"
                    />
                    <label class="form-check-label small" htmlFor="terms">
                      By creating an account you agree to our{" "}
                      <Link href="/">Terms of Service</Link> and our{" "}
                      <Link href="/">Privacy policy</Link>
                    </label>
                  </div>
                  <div className="col-12">
                    <button type="submit" class="btn btn-primary">
                      Create account
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

export default SecondPage;
