import React from "react";
import "./notFoundRoute.scss";
import pageNotFound from "../../images/notFound.png";

function NotFoundRoute() {
  return (
    <div className="notFoundRoute">
      <img src={pageNotFound} alt="page not found" />
    </div>
  );
}

export default NotFoundRoute;
