import {
  faPencilAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import Link from "next/link";
import React from "react";
import AppImage from "../../components/AppImage";

const MenuCard = ({ menu, className }) => {
  const { _key, image, title } = menu || {};

  return (
    <div className={classnames(className, "card shadow-sm")}>
      <Link href="/admin/menus/[slug]" as={`/admin/menus/${_key}`}>
        <a>
          <AppImage className="card-img-top" src={image} />
        </a>
      </Link>
      <div className="card-body d-flex flex-row align-items-center">
        <h5 className="card-title text-truncate mb-0 me-auto">{title}</h5>
        <Link href="/admin/menus/[slug]" as={`/admin/menus/${_key}`}>
          <a className="btn btn-outline-dark btn-sm">
            <FontAwesomeIcon icon={faPencilAlt} /> Edit
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MenuCard;
