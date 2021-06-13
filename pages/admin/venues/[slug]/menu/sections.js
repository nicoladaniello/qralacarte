import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AdminLayout from "../../../../../components/admin/AdminLayout";
import useAuth from "../../../../../components/auth/useAuth";
import Breadcrumb from "../../../../../components/common/Breadcrumb";
import SectionsManager from "../../../../../features/menus/sections/SectionsManager";
import { useGetVenueMutation } from "../../../../../features/venues/api";

const AdminEditMenuSections = () => {
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
      <div className="container-fluid h-100">
        <div className="p-4">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item href="/admin">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item href="/admin/venues">Locali</Breadcrumb.Item>
            <Breadcrumb.Item href={`/admin/venues/${slug}`}>
              {venue.data?.title || slug}
            </Breadcrumb.Item>
            <Breadcrumb.Item href={`/admin/venues/${slug}/menu`}>
              Menú
            </Breadcrumb.Item>
            <Breadcrumb.Item>Sezioni</Breadcrumb.Item>
          </Breadcrumb>

          <SectionsManager menuId={slug} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEditMenuSections;
