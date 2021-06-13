import React from "react";
import AdminLayout from "../../../../../components/admin/AdminLayout";
import CreateMenuLayout from "../../../../../components/onboarding/CreateMenuLayout";
import InsertMenuItemsWizard from "../../../../../components/onboarding/form/InsertMenuItemsWizard";

const AdminGenerateQRCode = () => {
  return <InsertMenuItemsWizard />;
};

const crumbs = [
  { label: "Ristoranti", href: "/admin/venues" },
  { label: "Aggiungi un ristorante" },
];

AdminGenerateQRCode.getLayout = (page) => (
  <AdminLayout crumbs={crumbs}>
    <CreateMenuLayout>{page}</CreateMenuLayout>
  </AdminLayout>
);

export default AdminGenerateQRCode;
