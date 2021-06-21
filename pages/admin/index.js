import { useRouter } from "next/router";
import { useEffect } from "react";

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/menus");
  });

  return null;
};

export default AdminPage;
