import classnames from "classnames";
import Image from "next/image";
import React from "react";
import { generateQRCode } from "../../utils/utils";

const MenuQrCode = ({ menu, className }) => {
  const { _key } = menu || {};

  const menuUrl = process.env.NEXT_PUBLIC_MENU_BASE_URL + _key;
  const qrCode = _key ? generateQRCode(menuUrl) : null;
  const downloadImgName = `Menu QR-code for ${_key}`;

  return (
    <div className="row g-0">
      <div className="col-lg-auto mb-3 mb-lg-0 pe-lg-4">
        <div className="card shadow-sm mb-3">
          <Image
            alt={`QR code for ${menuUrl}`}
            src={qrCode}
            width={300}
            height={300}
            layout="intrinsic"
            className="card-img-top"
          />
          <div className="card-body text-center">
            <a
              target="_blank"
              download={downloadImgName}
              href={qrCode}
              className="btn btn-primary"
            >
              Download QR code
            </a>
          </div>
        </div>
      </div>
      <div className="col-lg">
        <div className="card shadow-sm">
          <div className="card-body">
            <h6 className="text-muted mb-0">Sharing information</h6>
            <hr className="mt-1" />
            <div className="container-fluid">
              <div className="row mb-3">
                <label
                  htmlFor="input-menu-url"
                  className="col-3 col-form-label fw-bold"
                >
                  Menu URL:
                </label>
                <div className="col-9">
                  <input
                    type="url"
                    id="input-menu-url"
                    className="form-control bg-white"
                    value={menuUrl}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuQrCode;
