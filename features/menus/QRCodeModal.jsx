import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import Emoji from "../../components/Emoji";
import { generateQRCode } from "../../utils/utils";
import Modal, { useModal } from "../modals";

const QRCodeModal = () => {
  const { isOpen, props, close } = useModal(QRCodeModal);

  const menuUrl = process.env.NEXT_PUBLIC_MENU_BASE_URL + props?.slug;
  const qrCode = generateQRCode(menuUrl);
  const downloadImgName = `Menu QR-code for ${props?.slug}`;

  return (
    <Modal className="modal-fullscreen-sm-down" isOpen={isOpen} onClose={close}>
      <Modal.Header closable as="h2" className="fw-bold text-center ms-auto">
        Congrats! <Emoji symbol="🎉" label="Party popper" />
      </Modal.Header>
      <Modal.Body className="bg-light">
        <div className="text-center">
          {props?.slug && (
            <div className="row justify-content-center mb-4">
              <div className="bg-white col-6 shadow border-0 rounded">
                <Image
                  alt={`QR code for ${menuUrl}`}
                  src={qrCode}
                  width={300}
                  height={300}
                  layout="intrinsic"
                />
              </div>
            </div>
          )}
          <p className="lead">
            You have succesfully created your Digital Menu!
          </p>
          <p className="lh-sm">
            Here is your unique QR-code you can use to share your menu with your
            customers. You can access it any time by going to the "
            <i>/Sharing</i>" tab on your Menu Manager page.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <a
          target="_blank"
          download={downloadImgName}
          href={qrCode}
          className="btn btn-link btn-sm link-secondary me-auto"
        >
          <FontAwesomeIcon className="me-1" icon={faDownload} />
          Download QR-code
        </a>
        <button className="btn btn-primary" onClick={() => close()}>
          That's great! <Emoji symbol="👍" label="Thumbs up" />
        </button>
      </Modal.Footer>
    </Modal>
  );
};

QRCodeModal.displayName = "QRCodeModal";

export default QRCodeModal;
