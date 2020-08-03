import React from "react";
import admin from "../firebase/adminApp";
import AppLayout from "../components/app/appLayout";
import { merge, sortBy, map } from "lodash";

const Restaurant = ({ data }) => {
  data.menu = sortBy(data.menu, (menuSection) => {
    menuSection.products = sortBy(menuSection.products, "position");
    return menuSection.position;
  });

  console.log(data);

  return data ? (
    <AppLayout data={data} />
  ) : (
    <div className="alert alert-danger">No data</div>
  );
};

export async function getServerSideProps({ params, query }) {
  const { slug } = params;
  // Fetch data from external API
  // const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
  // const data = await res.json();

  // console.log(req.headers["accept-language"]);

  const db = admin.database();

  const restaurantRef = db.ref(`restaurants/${slug}`);
  const restaurantSnap = await restaurantRef.once("value");
  const info = restaurantSnap.val();

  const menuRef = db.ref(`menus/${slug}`);
  const menuSnap = await menuRef.once("value");
  const menuData = menuSnap.val();

  const translations = Object.keys(menuData.translations);

  let language = info.default_language;

  if (query.lang && query.lang !== info.default_language) {
    language = query.lang;
  }

  let menu = merge(menuData.menu, menuData.translations[language]);

  menu = map(menuData.menu, (section, key) => {
    section._key = key;
    section.products = map(section.products, (product, key) => {
      product._key = key;
      return product;
    });
    return section;
  });

  const data = {
    info,
    menu,
    translations,
    language,
  };

  // console.log(data);

  // Pass data to the page via props
  return { props: { data } };
}

export default Restaurant;
