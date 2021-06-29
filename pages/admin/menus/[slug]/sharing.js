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
import MenuQrCode from "../../../../features/menus/MenuQrCode";

const AdminMenuSharingPage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const { slug } = router.query;
  const { data, error, isLoading, isSuccess, isError } =
    useGetFullMenuQuery(slug);

  return (
    <Authenticated>
      <Page>
        <div className="card border-0 rounded-0">
          <div className="container pt-lg-2">
            <Breadcrumb>
              <Breadcrumb.Item href="/admin/menus">Menus</Breadcrumb.Item>
              <Breadcrumb.Item
                href="/admin/menus/[slug]"
                as={`/admin/menus/${slug}`}
              >
                {slug}
              </Breadcrumb.Item>
              <Breadcrumb.Item>Sharing</Breadcrumb.Item>
            </Breadcrumb>
            <div className="d-flex">
              <h1 className="h2 pb-lg-2 me-auto">{data?.title || slug}</h1>
              <div>
                <Link href="/r/[slug]" as={`/r/${slug}`}>
                  <a className="btn btn-primary">preview menu</a>
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
                href="/admin/menus/[slug]/sharing"
                as={`/admin/menus/${slug}/sharing`}
              >
                Sharing
              </Nav.Item>
              {/* <Nav.Item
                href="/admin/menus/[slug]/settings"
                as={`/admin/menus/${slug}/settings`}
              >
                Settings
              </Nav.Item> */}
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

          {currentUser?.signInProvider === "anonymous" && (
            <Alert warning className="text-start small mb-4">
              <h6 className="alert-heading">Sign up to save your data.</h6>
              Ensure you{" "}
              <Link href="/signin">
                <a className="alert-link">sign up</a>
              </Link>{" "}
              to activate your account and avoid losing your data.
            </Alert>
          )}

          {isLoading && <Loading />}
          {isError && <Alert danger>{error?.message}</Alert>}
          {isSuccess && <MenuQrCode menu={data} />}
        </div>
      </Page>
    </Authenticated>
  );
};

export default AdminMenuSharingPage;
