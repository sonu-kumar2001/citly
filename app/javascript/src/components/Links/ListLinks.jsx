import React from "react";
import Table from "./Table";

const ListLinks = ({ data, handlePinned, handleClicked }) => {
  return (
    <Table
      data={data}
      handlePinned={handlePinned}
      handleClicked={handleClicked}
    />
  );
};

export default ListLinks;
