import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AdminLayout from "../../../../components/admin/AdminLayout";
import useAuth from "../../../../components/auth/useAuth";
import Breadcrumb from "../../../../components/common/Breadcrumb";
import { useGetVenueMutation } from "../../../../features/venues/api";

const AdminVenue = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const { slug } = router.query;
  const [getVenue, { data, isLoading, error }] = useGetVenueMutation(slug);

  // Load once logged in.
  useEffect(() => {
    if (currentUser) getVenue(slug);
  }, [currentUser, slug, getVenue]);

  return (
    <AdminLayout>
      <div className="container h-100 d-flex flex-column pt-4">
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item href="/admin">Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/venues">Locali</Breadcrumb.Item>
          <Breadcrumb.Item>{data?.title || slug}</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="h2 mb-4">{data?.title || slug}</h1>
        {isLoading && (
          <div className="m-auto spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {!!error && <div className="alert alert-danger">{error.message}</div>}
        {!!data && (
          <div className="row">
            <div className="col-lg-3">
              <div className="card shadow-sm h-100">
                <img
                  className="card-img"
                  alt="Modifica informazioni"
                  src="/images/illustrations/edit-info.svg"
                />
                <div className="card-body">
                  <h4 className="card-title mb-0">Informazioni</h4>
                  <p className="card-text text-muted">
                    Modifica le informazioni del tuo locale.
                  </p>
                </div>
                <div className="card-footer p-0">
                  <Link
                    href="/admin/venues/[slug]/info"
                    href={`/admin/venues/${slug}/info`}
                    passHref
                  >
                    <a className="btn btn-primary p-2 rounded-0 w-100">
                      Modifica
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card shadow-sm h-100">
                <img
                  className="card-img"
                  alt="Gestisci menú"
                  src="/images/illustrations/edit-menu.svg"
                />
                <div className="card-body">
                  <h4 className="card-title mb-0">Menu</h4>
                  <p className="card-text text-muted">
                    Gestisci il tuo menú del tuo locale.
                  </p>
                </div>
                <div className="card-footer p-0">
                  <Link
                    href="/admin/venues/[slug]/menu"
                    as={`/admin/venues/${slug}/menu`}
                    passHref
                  >
                    <a className="btn btn-primary p-2 rounded-0 w-100">
                      Gestisci
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card shadow-sm h-100">
                <div className="position-relative">
                  <img
                    className="card-img"
                    alt="Gestisci menú"
                    src="/images/illustrations/qr-code.svg"
                  />
                  <div
                    className="position-absolute"
                    style={{ top: "0px", right: "20px" }}
                  >
                    <a
                      className="text-muted"
                      style={{ fontSize: "8px" }}
                      href="https://www.freepik.com/vectors/phone"
                    >
                      created by freepik
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <h4 className="card-title mb-0">Condivisione</h4>
                  <p className="card-text text-muted">
                    Gestisci i metodi di condivisione del tuo menù.
                  </p>
                </div>
                <div className="card-footer p-0">
                  <Link
                    href="/admin/venues/[slug]/share"
                    as={`/admin/venues/${slug}/share`}
                    passHref
                  >
                    <a className="btn btn-primary p-2 rounded-0 w-100">
                      Gestisci
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminVenue;
