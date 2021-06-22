import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Alert from "../../../../components/Alert";
import Breadcrumb from "../../../../components/Breadcrumb";
import Loading from "../../../../components/Loading";
import Nav from "../../../../components/Nav";
import Page from "../../../../components/Page";
import Authenticated from "../../../../features/auth/Authenticated";
import { useGetFullMenuQuery } from "../../../../features/menus/api";
import MenuInfo from "../../../../features/menus/MenuInfo";
import UpdateMenuModal from "../../../../features/menus/UpdateMenuModal";
import { useModal } from "../../../../features/modals";

const AdminMenuPage = () => {
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
              >
                Settings
              </Nav.Item>
            </Nav>
          </div>
        </div>

        <div className="container my-4">
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
