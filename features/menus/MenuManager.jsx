import React from "react";
import Alert from "../../components/common/Alert";
import Loading from "../../components/common/Loading";
import AppError from "../../utils/AppError.js";
import UpsertProductModal from "../modals/UpsertProductModal";
import useModal from "../modals/useModal";
import { useGetAllProductsQuery } from "../products/api";
import MenuProductCard from "../products/MenuProductCard";
import { useGetAllSectionsQuery } from "./sections/api";
import MenuSectionCard from "./sections/MenuSectionCard";

/**
 * Product Manager
 */
const MenuManager = ({ menuId }) => {
  const sectionsQuery = useGetAllSectionsQuery({ menuId });
  const productsQuery = useGetAllProductsQuery({ menuId });
  const upsertProductModal = useModal(UpsertProductModal);

  const { data: sections, isLoading } = sectionsQuery;
  const { data: products, isError, error } = productsQuery;

  const editSection = (section) => console.log(section);
  const upsertProduct = (defaultValues) =>
    upsertProductModal.open({ defaultValues });

  // UI
  return (
    <>
      {isLoading && <Loading />}
      {isError && error.code !== AppError.codes.NOT_FOUND && (
        <Alert danger>{error?.message}</Alert>
      )}
      {sectionsQuery.isSuccess && (
        <div className="row">
          {[...sections]
            .sort((a, b) => a.position - b.position)
            .map((section) => (
              <div className="col-12 mb-4" key={section._key}>
                <MenuSectionCard section={section} onEdit={editSection}>
                  <div className="row align-items-stretch">
                    {productsQuery.isSuccess &&
                      [...products]
                        .filter((p) => p.section === section._key)
                        .sort((a, b) => a.position - b.position)
                        .map((product) => (
                          <div className="col-lg-4 mb-2" key={product._key}>
                            <MenuProductCard
                              className="h-100"
                              product={product}
                              onEdit={upsertProduct}
                            />
                          </div>
                        ))}
                    <div className="col-lg-4 mb-2">
                      <div
                        className="card bg-light"
                        style={{ borderStyle: "dashed" }}
                      >
                        <div
                          className="card-body d-flex"
                          onClick={() => upsertProduct()}
                        >
                          <button className="btn btn-light w-100 h-100">
                            Aggiungi prodotto
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </MenuSectionCard>
              </div>
            ))}
          <UpsertProductModal menuId={menuId} sections={sections} />
        </div>
      )}
    </>
  );
};

export default MenuManager;
