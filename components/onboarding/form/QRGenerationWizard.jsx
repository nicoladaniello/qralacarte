import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const QRGenerationWizard = () => {
  const router = useRouter();
  const { slug } = router.query;

  const api = "https://chart.googleapis.com/chart?";
  const options = {
    cht: "qr", // Type of chart
    chs: "300x300", // Size
    chl: slug, // Content
    chld: "H", // Error correction level - L (default), M, Q, H
  };

  const url =
    api +
    Object.keys(options)
      .map((key) => `${key}=${options[key]}`)
      .join("&");

  return (
    <>
      <h2 className="mb-0">Personalizza il tuo codice QR.</h2>
      <p className="text-muted">
        Adatta l'immagine per il tuo brand, schegli un colore e aggiungi il tuo
        logo.
      </p>
      <div className="mb-4">
        <img className="img-fluid img-thumbnail shadow-sm" src={url} />
      </div>
      <p className="mb-0">
        <Link href={`/admin/venues/new/${slug}/menu`}>
          <a className="btn btn-primary">Personalizza</a>
        </Link>
      </p>
    </>
  );
};

export default QRGenerationWizard;
