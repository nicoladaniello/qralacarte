import React, { useState } from "react";
import { useRouter } from "next/router";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

const LanguageSelector = ({ languages, defaultLanguage }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState(defaultLanguage);
  const { pathname } = router;
  const { slug } = router.query;

  const select = (l) => {
    if (current !== l) {
      setShow(false);
      setCurrent(l);
      router.push(`/${slug}`, { query: { lang: l } });
    }
  };

  return (
    <>
      <a
        className="nav-link dropdown-toggle px-1 py-0 btn btn-light btn-sm"
        id="languageSelector"
        aria-haspopup="true"
        aria-expanded={show}
        onClick={() => setShow(!show)}
      >
        <FontAwesomeIcon
          icon={faFlag}
          className="text-primary"
          style={{ fontSize: "0.75rem" }}
        />{" "}
        {current}
      </a>
      <div
        className={classnames(["dropdown-menu shadow-lg rounded-0", { show }])}
        style={{ minWidth: "auto" }}
        aria-labelledby="languageSelector"
      >
        {languages
          .filter((lang) => lang !== current)
          .map((lang) => (
            <button
              key={lang}
              className="dropdown-item btn-sm"
              onClick={() => select(lang)}
            >
              {lang}
            </button>
          ))}
      </div>
    </>
  );
};

export default LanguageSelector;
