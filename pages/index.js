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
            Consistency is a must for a good business. With our service you can
            create a good visual-looking QR code that fits your brand design,
            and is a pleasure for your customer to see.
          </p>
          <p>
            <Link href="/signup">
              <a className="btn btn-outline-tertiary">Start for free</a>
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
          <h5>Modern APP-like digital menu.</h5>
          <p>
            Yes high tech, but cheap, fast and easy. Your menu will look and
            feel like a modern mobile APP, but without downloads. It works
            offline too!
          </p>
          <p>
            <Link href="/signup">
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
          <h5>Instant editing with the online tool.</h5>
          <p>
            Need to change a price? Add in pictures? Not a problem. Just login
            from your device and bring all your changes you want to your menu,
            synchronizes in real time.
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
              It takes 3 minutes to register, personalise your QR code and start
              creating your menu. All for free for the first week, then pay as
              you go.
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
          <h4>Personalise your QR code.</h4>
          <p>
            Create an account in seconds and personalise your QR code with our
            online editing tool.
          </p>
        </div>
        <div className="col-12 col-lg-6 px-lg-3 mb-3">
          <div className="display-1">2</div>
          <h4>Place it where customers can see it.</h4>
          <p>
            Place your QR code where customer can see it and scan it with the
            camera of their smartphones.
          </p>
        </div>
        <div className="col-12 col-lg-6 px-lg-3 mb-3">
          <div className="display-1">3</div>
          <h4>Create your digital menu.</h4>
          <p>
            Use the online tool to upload images, update informations and prices
            and create your digital menu.
          </p>
        </div>
        <div className="col-12 col-lg-6 px-lg-3 mb-3">
          <div className="display-1">4</div>
          <h4>Take your orders.</h4>
          <p>
            That’s it, simple. Customers will have access to your menu
            everywhere at any time.
          </p>
        </div>
      </div>
    </div>
    {/* <div className="container text-center text-lg-left mb-3 mb-lg-5">
      <h2 className="h1">Pricing</h2>
      <h4>Work in progress...</h4>
    </div> */}
  </Layout>
);

export default Home;
