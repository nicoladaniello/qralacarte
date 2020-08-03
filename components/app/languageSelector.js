import React, { useState } from "react";
import { useRouter } from "next/router";
import classnames from "classnames";

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
    !!languages && (
      <div className="dropdown">
        <button
          className="btn btn-secondary btn-sm px-1 dropdown-toggle"
          type="button"
          id="languageSelector"
          aria-haspopup="true"
          aria-expanded={show}
          onClick={() => setShow(!show)}
        >
          {current}
        </button>
        <div
          className={classnames([
            "dropdown-menu shadow-lg rounded-0",
            { show },
          ])}
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
      </div>
    )
  );
};

export default LanguageSelector;
