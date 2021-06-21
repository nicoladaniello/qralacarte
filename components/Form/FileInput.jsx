import classnames from "classnames";
import React, { createRef, useState } from "react";
import { useEffect } from "react";

const FileInput = ({ className, onChange, children, ...rest }) => {
  const inputRef = createRef();
  const [fileUrl, setFileUrl] = useState();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const onFileChange = () => {
    const file = inputRef.current?.files[0];

    if (file) {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
      setFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (fileUrl) onChange(fileUrl);
    () => void URL.revokeObjectURL(fileUrl);
  }, [fileUrl]);

  return (
    <>
      <button
        {...rest}
        type="button"
        className={classnames(className, "btn btn-primary")}
        onClick={handleClick}
      >
        {children}
      </button>
      <input
        type="file"
        className="d-none"
        ref={inputRef}
        onChange={onFileChange}
      />
    </>
  );
};

export default FileInput;
