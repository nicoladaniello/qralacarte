import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createRef } from "react";
import Loading from "./Loading";

const ImageManager = ({ isLoading, onUpload }) => {
  const inputRef = createRef();

  const handleClick = () => {
    inputRef.current.click();
  };

  const onFileChange = () => {
    console.log(inputRef.current.files);

    const file = inputRef.current.files[0];

    if (file) {
      const url = URL.createObjectURL(file);
      onUpload(url);
    }
  };

  return (
    <div className="card bg-light" style={{ borderStyle: "dashed" }}>
      <div className="card-body">
        {isLoading ? (
          <Loading />
        ) : (
          <button
            type="button"
            className="btn btn-link h-100"
            onClick={() => handleClick()}
          >
            <FontAwesomeIcon icon={faImage} />
          </button>
        )}
        <input
          type="file"
          className="d-none"
          ref={inputRef}
          onChange={onFileChange}
        />
      </div>
    </div>
  );
};

export default ImageManager;
