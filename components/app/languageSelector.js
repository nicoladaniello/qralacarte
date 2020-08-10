import React, { useState } from "react";
import { useRouter } from "next/router";

const LanguageSelector = ({ languages, defaultLanguage }) => {
  const router = useRouter();
  const [current, setCurrent] = useState(defaultLanguage);
  const { slug } = router.query;

  const select = (l) => {
    if (current !== l) {
      setCurrent(l);
      router.push(`/${slug}`, { query: { lang: l } });
    }
  };

  return (
    <select
      className="btn btn-light btn-sm"
      style={{ padding: "0.25rem 0.5rem" }}
      defaultValue={defaultLanguage}
      onChange={(event) => select(event.target.value)}
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
