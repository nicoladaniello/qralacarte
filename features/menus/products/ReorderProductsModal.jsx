import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DnDContainer, Draggable, Droppable } from "../../../components/dnd";
import Form from "../../../components/Form";
import Modal, { useModal } from "../../modals";
import { useUpsertSectionMutation } from "../api";

const ReorderProductsModal = () => {
  const { isOpen, props, close } = useModal(ReorderProductsModal);
  const [upsertSection, { isLoading }] = useUpsertSectionMutation();
  const [productIds, setProductIds] = useState([]);
  const { handleSubmit } = useForm();

  const reorder = ({ pid }, idx) => {
    const reordered = [...productIds];
    reordered.splice(idx, 0, reordered.splice(reordered.indexOf(pid), 1)[0]);
    setProductIds(reordered);
  };

  const onSubmit = async () => {
    try {
      const action = upsertSection({ ...props?.section, productIds });
      await action.unwrap();
      close();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props) setProductIds(props.section?.productIds || []);
  }, [props]);

  return (
    <Modal scrollable isOpen={isOpen} onClose={close}>
      <Modal.Header>Reorder products</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DnDContainer>
            <ul className="list-group">
              {productIds.map((pid, idx) => {
                const product = props?.products?.find((p) => p._key === pid);
                return (
                  <Droppable
                    key={pid}
                    accept="product"
                    as="li"
                    className="list-group-item p-0"
                    isOverClass="bg-warning"
                    onDrop={(item) => reorder(item, idx)}
                    deps={[productIds]}
                  >
                    <Draggable
                      type="product"
                      item={{ pid }}
                      deps={[productIds]}
                    >
                      <Draggable.Preview className="py-2 px-3">
                        <div className="d-flex justify-content-between">
                          <div className="fw-bold">{product?.title}</div>
                          <Draggable.Drag>
                            <FontAwesomeIcon icon={faBars} />
                          </Draggable.Drag>
                        </div>
                      </Draggable.Preview>
                    </Draggable>
                  </Droppable>
                );
              })}
            </ul>
          </DnDContainer>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Form.Button onClick={() => close()}>Dismiss</Form.Button>
        <Form.Submit disabled={isLoading} onClick={handleSubmit(onSubmit)}>
          {isLoading ? "Saving..." : "Save"}
        </Form.Submit>
      </Modal.Footer>
    </Modal>
  );
};

export default ReorderProductsModal;
