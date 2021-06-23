import { faBars, faEllipsisV, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Dropdown from "../../components/Dropdown";
import useModal from "../modals/useModal";
import DeleteProductModal from "./products/DeleteProductModal";
import EditProductCard from "./products/EditProductCard";
import ReorderProductsModal from "./products/ReorderProductsModal";
import UpsertProductModal from "./products/UpsertProductModal";
import DeleteSectionModal from "./sections/DeleteSectionModal";
import EditSectionCard from "./sections/EditSectionCard";
import ReorderSectionsModal from "./sections/ReorderSectionsModal";
import UpsertSectionModal from "./sections/UpsertSectionModal";

/**
 * Product Manager
 */
const ProductsManager = ({ menu }) => {
  const upsertProductModal = useModal(UpsertProductModal);
  const upsertSectionModal = useModal(UpsertSectionModal);
  const deleteSectionModal = useModal(DeleteSectionModal);
  const deleteProductModal = useModal(DeleteProductModal);
  const reorderProductsModal = useModal(ReorderProductsModal);
  const reorderSectionsModal = useModal(ReorderSectionsModal);

  const { _key, sectionIds = [], sections = [], products = [] } = menu || {};

  const addSection = () => {
    upsertSectionModal.open({
      sections,
      defaultValues: { _menuKey: _key },
    });
  };

  const editSection = (defaultValues) => {
    upsertSectionModal.open({ sections, defaultValues });
  };

  const deleteSection = (section) => {
    deleteSectionModal.open({ section });
  };

  const reorderSections = () => {
    reorderSectionsModal.open({ menu });
  };

  const addProduct = (section) => {
    const defaultValues = { _menuKey: _key, section: section._key };
    upsertProductModal.open({ sections, defaultValues });
  };

  const editProduct = (defaultValues) => {
    console.log(defaultValues);
    upsertProductModal.open({ sections, defaultValues });
  };

  const deleteProduct = (product) => {
    deleteProductModal.open({ product });
  };

  const reorderProducts = (section) => {
    reorderProductsModal.open({ section, products });
  };

  // UI
  return (
    <>
      <div className="mb-2 text-end">
        <button className="btn btn-outline-dark btn-sm" onClick={addSection}>
          <FontAwesomeIcon icon={faPlus} /> add section
        </button>
      </div>
      <div className="row">
        {sectionIds.map((sectionId) => {
          const section = sections.find(({ _key }) => _key === sectionId);
          return (
            !!section && (
              <div className="col-12 mb-4" key={sectionId}>
                <EditSectionCard
                  section={section}
                  onAddProduct={addProduct}
                  onReorder={reorderSections}
                  onEdit={editSection}
                  onDelete={deleteSection}
                >
                  <div className="row align-items-stretch">
                    {section.productIds?.map((productId) => {
                      const product = products.find(
                        ({ _key }) => _key === productId
                      );
                      return (
                        <div className="col-lg-6 mb-2" key={productId}>
                          <EditProductCard
                            className="h-100"
                            product={product}
                            onReorder={() => reorderProducts(section)}
                            onEdit={editProduct}
                            onDelete={deleteProduct}
                          />
                        </div>
                      );
                    })}
                    {!section.productIds?.length && (
                      <p className="text-muted text-center mb-0">
                        No products.
                      </p>
                    )}
                  </div>
                </EditSectionCard>
              </div>
            )
          );
        })}
        <UpsertProductModal />
        <UpsertSectionModal />
        <DeleteSectionModal />
        <DeleteProductModal />
        <ReorderProductsModal />
        <ReorderSectionsModal />
      </div>
    </>
  );
};

export default ProductsManager;
