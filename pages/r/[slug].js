import { faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import AppImage from "../../components/AppImage";
import Collapse from "../../components/Collapse";
import Navbar from "../../components/Navbar";
import ProductModal from "../../features/menus/products/ProductModal";
import SectionTabs from "../../features/menus/sections/SectionTabs";
import SectionView from "../../features/menus/sections/SectionView";
import useModal from "../../features/modals/useModal";
import admin from "../../firebase/firebaseAdmin";

const Restaurant = ({ menu }) => {
  const [activeSection, setActiveSection] = useState();
  const {
    image,
    title,
    description,
    address,
    tel,
    sectionIds,
    sections,
    products,
  } = menu || {};
  const productModal = useModal(ProductModal);

  return (
    <>
      <Navbar className="border-bottom mb-lg-4" />
      <div className="bg-white pb-4">
        <div className="container g-xl-5">
          <div className="card border-0">
            <div className="row no-gutters">
              <div className="col-lg-5 order-lg-last">
                <AppImage src={image} className="mb-2" />
                <ul className="fa-ul small text-muted ms-3 mb-0">
                  <li>
                    <p className="text-truncate mb-0">
                      <span className="fa-li">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                      </span>
                      <a
                        className="text-reset"
                        href={`http://maps.google.com/?q=${address}`}
                      >
                        {address}
                      </a>
                    </p>
                  </li>
                  <li className="">
                    <p className="text-truncate mb-0">
                      <span className="fa-li">
                        <FontAwesomeIcon icon={faPhone} />
                      </span>
                      <a className="text-reset" href={`tel:0039${tel}`}>
                        +39 {tel}
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col-lg-7 pe-lg-5">
                <h1 className="fw-bold">{title}</h1>
                <Collapse>
                  <p className="text-muted">{description}</p>
                </Collapse>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white sticky-top border-top border-bottom mb-4">
        <div className="container g-0 g-xl-5">
          <SectionTabs
            className="border-0"
            sections={{ ids: sectionIds, entities: sections }}
            active={activeSection}
            setActive={setActiveSection}
          />
        </div>
      </div>

      <div className="container g-0 g-xl-5">
        {sectionIds?.map((sid) => (
          <SectionView
            key={sid}
            section={sections.find((s) => s._key === sid)}
            products={products}
            active={activeSection === sid}
            setActive={setActiveSection}
            onProductClick={(product) => productModal.open({ product })}
          />
        ))}
      </div>
      <ProductModal />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { slug } = params;

  try {
    const db = admin.firestore();
    const menuRef = db.collection("menus").doc(slug);

    const infoPromise = menuRef.collection("public").doc("info").get();
    const sectionDocsPromise = menuRef.collection("sections").get();
    const productDocsPromise = menuRef.collection("products").get();

    const [infoSnap, sectionsSnap, productsSnap] = await Promise.all([
      infoPromise,
      sectionDocsPromise,
      productDocsPromise,
    ]);

    if (!infoSnap.exists) {
      return {
        redirect: {
          permanent: false,
          destination: "/404",
        },
      };
    }

    const menu = infoSnap.data();
    const sections = sectionsSnap.docs.map((doc) => ({
      _key: doc.id,
      ...doc.data(),
    }));
    const products = productsSnap.docs.map((doc) => ({
      _key: doc.id,
      ...doc.data(),
    }));

    // console.log(menu, sections, products);

    // Pass data to the page via props
    return {
      props: {
        menu: {
          ...menu,
          sections,
          products,
        },
      },
    };
  } catch (e) {
    console.error(e);
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }
}

export default Restaurant;
