import firebase from "firebase/app";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import AdminLayout from "../../../../components/admin/AdminLayout";
import RestaurantInfoForm from "../../../../components/admin/RestaurantInfoForm";
import withAuth from "../../../../components/auth/withAuth";
import Link from "../../../../components/common/Link";

const AdminRestaurants = () => {
  const [infos, setInfos] = useState({});
  const router = useRouter();
  const { slug } = router.query;

  const getRestaurantInfos = useCallback(async () => {
    try {
      const infos = await firebase.database().ref(`restaurants/${slug}`).get();
      setInfos(infos.val());
    } catch (error) {
      console.error(error);
    }
  }, [slug, setInfos]);

  useEffect(() => {
    getRestaurantInfos();
  }, [getRestaurantInfos]);

  console.log(infos);

  return (
    <AdminLayout>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link className="text-reset" href="/admin/restaurants">
              Ristoranti
            </Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {infos.title}
          </li>
        </ol>
      </nav>
      <h1 className="h2 mb-4">{infos.title}</h1>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <Link className="nav-link" href={`/admin/restaurants/${slug}`}>
            Infos
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href={`/admin/restaurants/${slug}/menu`}>
            Menu
          </a>
        </li>
      </ul>
      <div className="container">
        <RestaurantInfoForm data={{ slug, ...infos }} />
      </div>
    </AdminLayout>
  );
};

export default withAuth(AdminRestaurants);
