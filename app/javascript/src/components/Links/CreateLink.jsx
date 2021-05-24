import React from "react";

import LinkForm from "components/Links/Form/LinkForm";

const CreateLink = ({ link, loading, setLink, handleSubmit }) => {
  return (
    <LinkForm
      link={link}
      loading={loading}
      setLink={setLink}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateLink;
