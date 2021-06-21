import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DnDContainer, Draggable, Droppable } from "../../../components/dnd";
import Form from "../../../components/Form";
import Modal, { useModal } from "../../modals";
import { useUpdateMenuInfoMutation } from "../api";

const ReorderSectionsModal = () => {
  const { isOpen, props, close } = useModal(ReorderSectionsModal);
  const [updateMenu, { isLoading }] = useUpdateMenuInfoMutation();
  const [sectionIds, setSectionIds] = useState([]);
  const { handleSubmit } = useForm();

  const { _key, sections = [] } = props?.menu || {};

  const reorder = ({ sid }, idx) => {
    const reordered = [...sectionIds];
    reordered.splice(idx, 0, reordered.splice(reordered.indexOf(sid), 1)[0]);
    setSectionIds(reordered);
  };

  const onSubmit = async () => {
    try {
      const action = updateMenu({ _key, sectionIds });
      await action.unwrap();
      close();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props) setSectionIds(props.menu.sectionIds || []);
  }, [props]);

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <Modal.Header>Reorder sections</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DnDContainer>
            <ul className="list-group">
              {sectionIds.map((sid, idx) => {
                const section = sections.find((s) => s._key === sid);
                return (
                  <Droppable
                    key={sid}
                    accept="section"
                    as="li"
                    className="list-group-item p-0"
                    isOverClass="bg-warning"
                    onDrop={(item) => reorder(item, idx)}
                    deps={[sectionIds]}
                  >
                    <Draggable
                      type="section"
                      item={{ sid }}
                      deps={[sectionIds]}
                    >
                      <Draggable.Preview className="py-2 px-3">
                        <div className="d-flex justify-content-between">
                          <div className="fw-bold">{section?.title}</div>
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

export default ReorderSectionsModal;
