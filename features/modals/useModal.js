import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal, selectModal } from "./slice";

const useModal = (modal) => {
  const { isOpen, props } =
    useSelector((state) => selectModal(state, modal)) || {};
  const dispatch = useDispatch();

  const open = (props) => {
    if (!modal.displayName) {
      console.warn(
        "modal displayName is missing. This can cause issues in the modal."
      );
      return;
    }
    return dispatch(openModal({ modal: modal.displayName, props }));
  };

  const close = () => dispatch(closeModal(modal.name));

  return {
    isOpen,
    props,
    open,
    close,
  };
};

export default useModal;
