import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AdminLayout from "../../../../../components/admin/AdminLayout";
import useAuth from "../../../../../components/auth/useAuth";
import Breadcrumb from "../../../../../components/common/Breadcrumb";
import MenuManager from "../../../../../features/menus/MenuManager";
import { useGetVenueMutation } from "../../../../../features/venues/api";

const AdminEditMenuProducts = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const { slug } = router.query;
  const [getVenue, venue] = useGetVenueMutation(slug);

  // Load data once logged in confirmed.
  useEffect(() => {
    if (!currentUser) return;
    getVenue(slug);
  }, [currentUser, slug, getVenue]);

  return (
    <AdminLayout>
      <div className="container-fluid h-100 bg-light">
        <div className="p-4">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item href="/admin">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item href="/admin/venues">Locali</Breadcrumb.Item>
            <Breadcrumb.Item
              href="/admin/venues/[slug]"
              as={`/admin/venues/${slug}`}
            >
              Ristorante L'Aragosta
            </Breadcrumb.Item>
            <Breadcrumb.Item
              href="/admin/venues/[slug]/menu"
              as={`/admin/venues/${slug}/menu`}
            >
              Menú
            </Breadcrumb.Item>
            <Breadcrumb.Item>Prodotti</Breadcrumb.Item>
          </Breadcrumb>

          <div className="d-flex align-items-center mb-4">
            <div>
              <h1 className="h2 mb-0">Gestisci il menù</h1>
              <p className="text-muted mb-0">
                Aggiungi, rimouvi e organizza i prodotti del menú.
              </p>
            </div>
          </div>
          <MenuManager menuId={slug} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEditMenuProducts;
