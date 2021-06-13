import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import RestaurantCard from "../../../components/admin/RestaurantCard";
import useAuth from "../../../components/auth/useAuth";
import Breadcrumb from "../../../components/common/Breadcrumb";
import Loading from "../../../components/common/Loading";
import { useGetAllVenuesMutation } from "../../../features/venues/api";

const AdminVenueListings = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  const { slug } = router.query;

  const [getAllVenues, { data, isLoading, isError, error }] =
    useGetAllVenuesMutation();

  useEffect(() => {
    if (!currentUser) return;
    getAllVenues({ where: ["userId", "==", currentUser.uid] });
  }, [currentUser, getAllVenues]);

  return (
    <AdminLayout currentUser={currentUser}>
      <div className="container pt-4">
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item href="/admin">Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Locali</Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex">
          <h1 className="h2 mb-4">I tuoi locali</h1>
          <div className="ms-auto">
            <Link href="/admin/venues/new" passHref>
              <a className="btn btn-primary">
                <span className="me-2">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                Aggiungi un locale
              </a>
            </Link>
          </div>
        </div>
        <div className="row no-gutters align-items-stretch">
          {isLoading ? (
            <Loading />
          ) : isError ? (
            <div className="alert alert-danger">{error.data.message}</div>
          ) : (
            !!data &&
            data.map((entity) => {
              const { _key, title, img, address } = entity;
              console.log(entity);
              return (
                <div key={_key} className="col-lg-3 mb-4">
                  <RestaurantCard
                    img={img}
                    title={title}
                    address={address}
                    href="/admin/venues/[slug]"
                    as={`/admin/venues/${_key}`}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminVenueListings;
