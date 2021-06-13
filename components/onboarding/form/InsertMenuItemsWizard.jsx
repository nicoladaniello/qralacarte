import { useRouter } from "next/router";
import React, { useState } from "react";
import MenuItemsForm from "../../admin/components/MenuItemsForm";

const InsertMenuItemsWizard = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [items, setItems] = useState({
    test: {
      title: "Bruschette miste",
      description: "Lorem ipsum dolor sit amet.",
      price: 12,
    },
    test2: {
      title: "Antipasti di mare",
      description: "Lorem ipsum dolor sit amet.",
      price: 10.5,
    },
    test3: {
      title: "Penne all'arrabbiata",
      description: "Lorem ipsum dolor sit amet.",
      price: 16.5,
    },
  });
  const [order, setOrder] = useState(["test", "test2", "test3"]);

  const addItem = (data) => {
    const key = Math.random() * 10;
    if (order[key]) return;

    setItems({ ...items, [key]: data });
    setOrder([...order, key]);
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <h2 className="mb-0">Aggiungi i tuoi piatti.</h2>
      <p className="text-muted">Modifica il menú per i tuoi clienti.</p>
      <div className="container-fluid mb-4">
        <MenuItemsForm items={items} keys={order} onSubmit={addItem} />
      </div>
      <p className="mb-0">
        <a type="submit" className="btn btn-light me-2">
          Finisci più tardi
        </a>
        <a type="submit" className="btn btn-primary">
          Completa
        </a>
      </p>
    </div>
  );
};

export default InsertMenuItemsWizard;
