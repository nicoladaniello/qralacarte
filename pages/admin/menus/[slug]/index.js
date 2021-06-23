import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Alert from "../../../../components/Alert";
import Breadcrumb from "../../../../components/Breadcrumb";
import Loading from "../../../../components/Loading";
import Nav from "../../../../components/Nav";
import Page from "../../../../components/Page";
import Authenticated from "../../../../features/auth/Authenticated";
import useAuth from "../../../../features/auth/useAuth";
import { useGetFullMenuQuery } from "../../../../features/menus/api";
import MenuInfo from "../../../../features/menus/MenuInfo";
import UpdateMenuModal from "../../../../features/menus/UpdateMenuModal";
import { useModal } from "../../../../features/modals";

const AdminMenuPage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const { slug } = router.query;
  const { data, error, isLoading, isSuccess, isError } =
    useGetFullMenuQuery(slug);
  const updateMenuModal = useModal(UpdateMenuModal);

  const handleEdit = (defaultValues) => {
    updateMenuModal.open({ defaultValues });
  };

  return (
    <Authenticated>
      <Page>
        <div className="card border-0 border-bottom">
          <div className="container pt-lg-2">
            <Breadcrumb>
              <Breadcrumb.Item href="/admin/menus">Menus</Breadcrumb.Item>
              <Breadcrumb.Item>{slug}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="d-flex">
              <h1 className="h2 pb-lg-2 me-auto">{data?.title || slug}</h1>
              <div>
                <Link href="/r/[slug]" as={`/r/${slug}`}>
                  <a className="btn btn-primary">Visit menu</a>
                </Link>
              </div>
            </div>
            <Nav className="mb-1">
              <Nav.Item href="/admin/menus/[slug]" as={`/admin/menus/${slug}`}>
                Info
              </Nav.Item>
              <Nav.Item
                href="/admin/menus/[slug]/products"
                as={`/admin/menus/${slug}/products`}
              >
                Products
              </Nav.Item>
              <Nav.Item
                href="/admin/menus/[slug]/settings"
                as={`/admin/menus/${slug}/settings`}
                className="disabled"
              >
                Settings
              </Nav.Item>
            </Nav>
          </div>
        </div>

        <div className="container my-4">
          {process.env.NEXT_PUBLIC_DEVELOPMENT &&
            currentUser?.uid === "cPK4bcvTdHYKHEiNtDfAm6A2uCE2" && (
              <Alert info className="text-start small mb-4">
                <h6 className="alert-heading">This account is sandboxed.</h6>
                Every time someone signs in to this account, the data will be
                restored.
              </Alert>
            )}
          {isLoading && <Loading />}
          {isError && <Alert danger>{error?.message}</Alert>}
          {isSuccess && <MenuInfo menu={data} onEdit={handleEdit} />}
        </div>

        <UpdateMenuModal />
      </Page>
    </Authenticated>
  );
};

export default AdminMenuPage;
