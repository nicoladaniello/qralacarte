import classnames from "classnames";
import NextImage from "next/image";
import React from "react";

const AppImage = ({ className, src, alt, squared, ...rest }) => {
  return (
    <div
      {...rest}
      className={classnames(className, "position-relative overflow-hidden")}
      style={{ paddingBottom: squared ? "100%" : "66.6666%" }}
    >
      <NextImage
        layout="fill"
        objectFit="cover"
        src={src || "/images/illustrations/no-photo.svg"}
        alt={alt}
      />
    </div>
  );
};

AppImage.defaultProps = {
  src: "/images/illustrations/no-photo.svg",
};

export default AppImage;
