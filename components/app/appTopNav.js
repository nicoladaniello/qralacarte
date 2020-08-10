import React from "react";
import LanguageSelector from "./languageSelector";

const AppTopNav = ({ data }) => {
  const { translations, language } = data;
  return (
    <nav className="navbar p-1 fixed-top">
      <div className="navbar-nav">
        <LanguageSelector languages={translations} defaultLanguage={language} />
      </div>
    </nav>
  );
};

export default AppTopNav;
