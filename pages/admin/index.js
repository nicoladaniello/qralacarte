import Head from "next/head";
import React from "react";
import withAuth from "../../components/auth/withAuth";
import Layout from "../../components/layout";

const AdminPage = () => {
  return (
    <Layout>
      <Head>
        <title>QRalacarte | Admin board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="row no-gutters justify-content-stretch"
        style={{
          height: "100vh",
        }}
      >
        <p>Welcome to the admin page</p>
      </div>
    </Layout>
  );
};

export default withAuth(AdminPage);
