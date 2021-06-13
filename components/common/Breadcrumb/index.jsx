import React from "react";
import BreadcrumbItem from "./BreadcrumbItem";

const Breadcrumb = ({ children, ...props }) => {
  return (
    <nav {...props} aria-label="breadcrumb">
      <ol className="breadcrumb">{children}</ol>
    </nav>
  );
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
