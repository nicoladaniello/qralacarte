import { faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import SectionView from "../../features/menus/sections/SectionView";
import SectionTabs from "../../features/menus/sections/SectionTabs";
import useModal from "../../features/modals/useModal";
import ProductModal from "../../features/menus/products/ProductModal";
import admin from "../../firebase/firebaseAdmin";
import AppImage from "../../components/AppImage";

const Restaurant = ({ menu }) => {
  const [activeSection, setActiveSection] = useState();
  const { image, title, address, tel, sections, products } = menu || {};
  const productModal = useModal(ProductModal);
  console.log(menu);

  return (
    <Layout>
      <Navbar className="border-bottom" />
      <div className="bg-light">
        <div className="bg-white">
          <AppImage src={image} />
          <div className="container g-3 py-3">
            <div className="">
              <h1 className="display-5 fw-bold">{title}</h1>
              <ul className="list-inline mb-0">
                <li className="list-inline-item col-12">
                  <p className="text-muted text-truncate mb-0">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                    <a
                      className="text-reset"
                      href={`http://maps.google.com/?q=${address}`}
                    >
                      {address}
                    </a>
                  </p>
                </li>
                <li className="list-inline-item col-12">
                  <p className="text-muted text-truncate mb-0">
                    <FontAwesomeIcon icon={faPhone} />{" "}
                    <a className="text-reset" href={`tel:0039${tel}`}>
                      +39 {tel}
                    </a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <SectionTabs
          className="border-top-0 mb-4 sticky-top"
          sections={sections}
          active={activeSection}
          setActive={setActiveSection}
        />

        <div className="container-lg g-0 g-sm-2">
          {[...sections]
            .sort((a, b) => a.position - b.position)
            .map((section) => (
              <SectionView
                key={section._key}
                section={section}
                products={[...products]
                  .filter((p) => p.section === section._key)
                  .sort((a, b) => a.position - b.position)}
                active={activeSection === section._key}
                setActive={setActiveSection}
                onProductClick={(product) => productModal.open({ product })}
              />
            ))}
        </div>
      </div>
      <ProductModal />
    </Layout>
  );
};

export async function getServerSideProps({ params, query }) {
  const { slug } = params;
  // Fetch data from external API
  // const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
  // const data = await res.json();

  // console.log(req.headers["accept-language"]);

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
}

export default Restaurant;
