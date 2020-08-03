import React from "react";
import Link from "next/link";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQrcode,
  faMobile,
  faPepperHot,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/layout";

import HomeHeader from "../components/homeHeader";

const Home = () => (
  <Layout>
    <Head>
      <title>QRalacarte | Make your QR menu</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HomeHeader />
    <div className="container mb-3 mb-lg-5">
      <div className="row mx-lg-n2 text-center text-lg-left">
        <div className="col-12 col-lg-4 px-lg-3">
          <div className="d-inline-block p-2 rounded-circle shadow mb-2">
            <FontAwesomeIcon
              style={{ fontSize: "1.5rem", color: "#ff9234" }}
              icon={faQrcode}
            />
          </div>
          <h5>Personalised QR code to match your brand.</h5>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores
          </p>
          <p>
            <Link href="/">
              <a className="btn btn-outline-tertiary">
                Create your QR for free
              </a>
            </Link>
          </p>
        </div>
        <div className="col-12 col-lg-4 px-lg-3">
          <div className="d-inline-block p-2 rounded-circle shadow mb-2">
            <FontAwesomeIcon
              style={{ fontSize: "1.5rem", color: "#84a9ac" }}
              icon={faMobile}
            />
          </div>
          <h5>Responsive online menu with a mobile app styling.</h5>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores
          </p>
          <p>
            <Link href="/">
              <a className="btn btn-outline-primary">Upload your menu</a>
            </Link>
          </p>
        </div>
        <div className="col-12 col-lg-4 px-lg-3">
          <div className="d-inline-block p-2 rounded-circle shadow mb-2">
            <FontAwesomeIcon
              style={{ fontSize: "1.5rem", color: "#e84a5f" }}
              icon={faPepperHot}
            />
          </div>
          <h5>Changes on menu made easy with our online tool.</h5>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores
          </p>
          <p>
            <Link href="/">
              <a className="btn btn-outline-secondary">Try it now</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
    <div
      className="jumbotron mb-3 mb-lg-5 bg-light"
      style={{
        backgroundImage: `url(images/pineapple.jpg)`,
        backgroundRepeat: "none",
        backgroundSize: "cover",
        backgroundPosition: "100% 50%",
      }}
    >
      <div className="container">
        <div className="row text-center text-lg-left">
          <div className="col-12 col-lg-6">
            <h2 className="h1">Free trial, no contract</h2>
            <p className="lead d-none d-lg-block mb-3">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores
            </p>
            <div className="d-lg-none" style={{ height: "180px" }}></div>
            <p>
              <Link href="/aragosta">
                <a className="btn btn-secondary">Get started for free</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="container text-center text-lg-left mb-3 mb-lg-5">
      <h2 className="h1">How it works</h2>
      <div className="row">
        <div className="col-12 col-lg-6 px-lg-3 mb-3">
          <div className="display-1">1</div>
          <h4>We provide you a personalised QR code</h4>
          <p>Lorem ispum dolor sit.</p>
        </div>
        <div className="col-12 col-lg-6 px-lg-3 mb-3">
          <div className="display-1">2</div>
          <h4>Place the QR where customers can see it.</h4>
          <p>Lorem ispum dolor sit.</p>
        </div>
        <div className="col-12 col-lg-6 px-lg-3 mb-3">
          <div className="display-1">3</div>
          <h4>Your customers will scan it with their phones.</h4>
          <p>Lorem ispum dolor sit.</p>
        </div>
        <div className="col-12 col-lg-6 px-lg-3 mb-3">
          <div className="display-1">4</div>
          <h4>Your menu becames accessible.</h4>
          <p>Lorem ispum dolor sit.</p>
        </div>
      </div>
    </div>
    <div className="container text-center text-lg-left mb-3 mb-lg-5">
      <h2 className="h1">Pricing</h2>
      <h4>Work in progress...</h4>
    </div>
  </Layout>
);

export default Home;
