import React from "react";
// import { Link, useRouteError } from "react-router-dom"


import { Link } from "react-router-dom";

function NoRepositoriesPage() {

  return (
    <div className="no-repositories">
      <h2>No Repositories Found</h2>
      <p> Sorry, You have reached the end of the repositories </p>
      {/* <p>Go to <Link to="/">Home Page</Link></p> */}
      <p>Go to <Link to="./RepositoriesList.jsx"><b>Home Page</b></Link></p>
    </div>
  );
}

export default NoRepositoriesPage;
