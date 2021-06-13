import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PropTypes } from "prop-types";

const RestaurantCard = ({ img, title, address, href, as }) => {
  return (
    <div className="card border-0 shadow-sm">
      <div
        className="position-relative w-100"
        style={{ paddingTop: "66.6666%" }} // 2:3
      >
        <Link href={href} passHref>
          <a>
            <Image src={img} layout="fill" objectFit="cover" />
            <img className="card-img-top" />
          </a>
        </Link>
      </div>
      <div className="card-body">
        <h5 className="card-title mb-1">{title}</h5>
        <p className="card-text small text-muted">{address}</p>
      </div>
      <Link href={href} as={as} passHref>
        <a className="btn btn-primary btn-block p-2 rounded-0">Gestisci</a>
      </Link>
    </div>
  );
};

RestaurantCard.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  address: PropTypes.string,
  href: PropTypes.string,
  as: PropTypes.string,
};

RestaurantCard.defaultProps = {
  img: "/images/illustrations/no-photo.svg",
  //img: "/images/food.jpg",
};

export default RestaurantCard;
