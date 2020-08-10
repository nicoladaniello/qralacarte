import React, { useState, useEffect } from "react";
import LanguageSelector from "./languageSelector";
import classnames from "classnames";

const AppTopNav = ({ data }) => {
  const { translations, language, title } = data;
  const [isTransformed, setTransformed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setTransformed(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", () => handleScroll);
  });

  return (
    <nav
      className={classnames([
        "navbar px-0 py-1 fixed-top",
        { "bg-white border-bottom": isTransformed },
      ])}
      style={{ transition: "all 200ms ease-in-out" }}
    >
      <ul className="navbar-nav flex-row">
        <li className="nav-item dropdown px-1 mr-1">
          <LanguageSelector
            languages={translations}
            defaultLanguage={language}
          />
        </li>
        {isTransformed && (
          <li className="nav-item">
            <h6
              className="mb-0 small font-weight-bold"
              style={{ paddingTop: "0.25rem" }}
            >
              {title}
            </h6>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default AppTopNav;
