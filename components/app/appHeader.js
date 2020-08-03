import React from "react";
import { useViewportScroll, useTransform, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faMapMarker,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import ListItem from "./listItem";
import LanguageSelector from "./languageSelector";

const AppHeader = ({ data, onShowModal }) => {
  const { img, title, phone, address, language, translations } = data;

  const { scrollY } = useViewportScroll();
  const backgroundPositionY = useTransform(scrollY, [0, 500], ["0%", "-60%"]);

  return (
    <header>
      <motion.div
        className="p-1"
        style={{
          width: "100%",
          height: "315px",
          backgroundImage: `url('${img}')`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPositionX: "center",
          backgroundPositionY,
          backgroundSize: "contain",
        }}
      >
        <LanguageSelector languages={translations} defaultLanguage={language} />
      </motion.div>
      <div className="list-group">
        <div className="list-group-item px-1 list-group-item-action rounded-0">
          <h1 className="mb-1">{title}</h1>
          <ul className="list-unstyled text-muted small">
            <li>
              <FontAwesomeIcon icon={faPhone} /> +39 {phone}
            </li>
            <li>
              <FontAwesomeIcon icon={faMapMarker} /> {address}
            </li>
          </ul>
        </div>
        <ListItem
          isLink
          data={{
            icon: faInfoCircle,
            iconClass: "text-info",
            title: "Informazioni",
            description: "Lista allergeni, Social accounts e altro",
          }}
          onClick={onShowModal}
        />
      </div>
    </header>
  );
};

export default AppHeader;
