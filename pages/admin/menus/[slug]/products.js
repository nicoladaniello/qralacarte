import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Breadcrumb from "../../../../components/Breadcrumb";
import Nav from "../../../../components/Nav";
import Navbar from "../../../../components/Navbar";
import Authenticated from "../../../../features/auth/Authenticated";
import { useGetFullMenuQuery } from "../../../../features/menus/api";
import ProductsManager from "../../../../features/menus/ProductsManager";

const AdminProductsPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, error, isLoading, isSuccess, isError } =
    useGetFullMenuQuery(slug);

  return (
    <Authenticated>
      <Navbar />
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

      <div className="container mt-4">
        <ProductsManager menu={data} />
      </div>
    </Authenticated>
  );
};

export default AdminProductsPage;
