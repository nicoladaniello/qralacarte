import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import SectionsEditor from "../../admin/components/SectionsEditor";

const CreateMenuWizard = () => {
  const router = useRouter();
  const { slug } = router.query;

  const setSections = (data) => {
    console.log(data);
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <h2 className="mb-0">Aggiungi sezioni al tuo menu.</h2>
      <p className="text-muted">Modifica il menú per i tuoi clienti.</p>
      <div className="mb-4">
        <SectionsEditor onSubmit={setSections} />
      </div>
      <p className="mb-0">
        <Link href={`/admin/venues/new/${slug}/items`}>
          <a type="submit" className="btn btn-light me-2">
            Finisci più tardi
          </a>
        </Link>
        <Link href={`/admin/venues/new/${slug}/items`}>
          <a type="submit" className="btn btn-primary">
            Completa
          </a>
        </Link>
      </p>
    </div>
  );
};

export default CreateMenuWizard;
