import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal, selectModal } from "./slice";

const useModal = (modal) => {
  const { isOpen, props } =
    useSelector((state) => selectModal(state, modal)) || {};
  const dispatch = useDispatch();

  const open = (props) => dispatch(openModal({ modal: modal.name, props }));

  const close = () => dispatch(closeModal(modal.name));

  return {
    isOpen,
    props,
    open,
    close,
  };
};

export default useModal;
