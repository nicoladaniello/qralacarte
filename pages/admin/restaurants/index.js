import firebase from "firebase/app";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import withAuth from "../../../components/auth/withAuth";

const AdminRestaurants = ({ currentUser }) => {
  const [restaurants, setRestaurants] = useState({});

  const getUserRestaurants = useCallback(async () => {
    try {
      const userRestaurants = await firebase
        .database()
        .ref(`userRestaurants/${currentUser.uid}`)
        .get();

      if (!userRestaurants.exists()) return;

      const promises = Object.keys(userRestaurants.val()).map((slug) => {
        return firebase.database().ref(`restaurants/${slug}`).get();
      });

      const restaurantVals = await Promise.all(promises);
      const restaurants = restaurantVals.reduce((prev, curr) => {
        prev[curr.key] = curr.val();
        return prev;
      }, {});

      setRestaurants(restaurants);
    } catch (error) {
      console.error(error);
    }
  }, [currentUser, setRestaurants]);

  useEffect(() => {
    getUserRestaurants();
  }, [getUserRestaurants]);

  console.log(restaurants);

  return (
    <AdminLayout>
      <h1 className="h2 mb-4">Ristoranti</h1>
      <div className="row no-gutters">
        {Object.keys(restaurants).map((slug) => {
          const { title, img, address } = restaurants[slug];

          return (
            <div key={slug} className="col-4">
              <div className="card border-0 shadow-sm mb-4">
                <Link href={`/admin/restaurants/${slug}`} passHref>
                  <a>
                    <img className="card-img-top" src={img} />
                  </a>
                </Link>
                <div className="card-body">
                  <h5 className="card-title mb-1">{title}</h5>
                  <p className="card-text small text-muted">{address}</p>
                </div>
                <Link href={`/admin/restaurants/${slug}`} passHref>
                  <a className="btn btn-primary btn-block p-2 rounded-0">
                    Gestisci
                  </a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
};

export default withAuth(AdminRestaurants);
