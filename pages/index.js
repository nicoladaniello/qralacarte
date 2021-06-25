import classnames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Page from "../components/Page";
import useViewport from "../hooks/useViewport";

SwiperCore.use([Pagination]);

const hero = {
  image: {
    alt: "QRalacarte example menu app",
    src: "/images/menu.svg",
  },
  title: "Create your<br />contactless menu<br />in seconds",
  description:
    "Build an interactive digital menu for your customers with just a few clicks. Try it now!",
  cta: "Get started",
};

const sections = [
  {
    image: {
      alt: "QR Code illustration",
      src: "/images/illustrations/qr-code.svg",
    },
    title: "Auto-generated QR code",
    description:
      "We generate a unique QR code to give your customers easy access to your menu.",
  },
  {
    image: {
      alt: "Menu manager illustration",
      src: "/images/illustrations/edit-menu.svg",
    },
    title: "Edits on the fly",
    description:
      "Edit your menu instantly with the easy-to-use Menu Manager tool.",
  },
  {
    image: {
      alt: "App illustration",
      src: "/images/illustrations/mobile.svg",
    },
    title: "Modern App-like interface",
    description:
      "Your menu will have a modern, easy-to-use interface. It works like a mobile app, without needs for download.",
  },
];

const footer = {
  title: "Let's get started",
  description: "Takes only one easy step to create your new digital menu.",
  cta: "Get started",
};

const HomeHero = React.memo(({ hero, className, slideNext }) => {
  const { image, title, description, cta } = hero;

  return (
    <div className={classnames(className, "container")}>
      <div className="row align-items-center justify-content-center">
        <div className="col-12 col-lg-6">
          <div className="text-center text-lg-start">
            <h1
              className="display-4 fw-bold mb-3"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <p
              className="lead lh-sm mb-3 mx-auto ms-lg-0"
              style={{ maxWidth: "29rem" }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <p>
              <Link href="/new">
                <a className="btn btn-primary px-3 shadow">{cta}</a>
              </Link>
              <button
                className="d-lg-none btn btn-outline-dark px-3 ms-3"
                onClick={slideNext}
              >
                Learn more
              </button>
            </p>
          </div>
        </div>
        <div className="col-12 col-lg-auto d-none d-lg-block">
          <Image
            alt={image.alt}
            src={image.src}
            width={350}
            height={600}
            layout="intrinsic"
            className="pt-4"
          />
        </div>
      </div>
    </div>
  );
});

const HomeSection = React.memo(({ section, idx, className, slideNext }) => {
  const { image, title, description } = section;
  const isEven = idx % 2 !== 0;

  return (
    <div className={classnames(className, "container py-lg-5")}>
      <div className="row align-items-center justify-content-center">
        <div
          className={classnames("col-12 col-lg-auto", {
            "order-lg-last": isEven,
          })}
        >
          <div className={`text-center text-lg-${isEven ? "start" : "end"}`}>
            <Image
              alt={image.alt}
              src={image.src}
              width={400}
              height={300}
              layout="intrinsic"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="text-center mx-auto" style={{ maxWidth: "30rem" }}>
            <h2 className="h1 fw-bold">{title}</h2>
            <p className="lead lh-sm mb-0">{description}</p>
          </div>
        </div>
        <div className="d-lg-none text-center mt-3">
          <button
            className="btn btn-outline-dark"
            style={{ minWidth: "160px" }}
            onClick={slideNext}
          >
            continue
          </button>
        </div>
      </div>
    </div>
  );
});

const HomeFooter = React.memo(({ footer }) => {
  const { title, description, cta } = footer;

  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="card-body text-center">
          <h2
            className="h1 fw-bold mb-4"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p
            className="lead lh-sm mb-4 mx-auto ms-lg-0"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <p>
            <Link href="/new">
              <a className="btn btn-primary px-3 shadow">{cta}</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
});

const Home = () => {
  const [swiper, setSwiper] = useState();
  const { width } = useViewport();

  const useSwiper = width <= 991;

  const slideNext = swiper ? () => swiper.slideNext() : () => {};

  return (
    <Page title="Make your QR menu">
      {useSwiper ? (
        <Swiper
          className="h-100 pb-4"
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSwiper={setSwiper}
        >
          {/* Hero */}
          <SwiperSlide className="d-flex align-items-center">
            <HomeHero
              hero={hero}
              slideNext={slideNext}
              className="d-flex h-100 align-items-center justify-content-center"
            />
          </SwiperSlide>

          {/* Section 1 */}
          {sections.map((section, idx) => (
            <SwiperSlide key={idx} className="d-flex align-items-center">
              <div>
                <HomeSection section={section} slideNext={slideNext} />
              </div>
            </SwiperSlide>
          ))}
          {/* Footer */}
          <SwiperSlide className="d-flex align-items-center">
            <HomeFooter footer={footer} />
          </SwiperSlide>
          <div className="swiper-pagination position-relative mt-2" />
        </Swiper>
      ) : (
        <>
          <HomeHero hero={hero} />
          {sections.map((section, idx) => (
            <HomeSection key={idx} section={section} idx={idx} />
          ))}
          <HomeFooter footer={footer} />
        </>
      )}
    </Page>
  );
};

export default Home;
