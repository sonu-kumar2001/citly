import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";

import Container from "components/Container";
import PageLoader from "components/PageLoader";
import linksApi from "apis/links";
import ListLinks from "components/Links/Table";
import { logger } from "common/logger";
import CreateLink from "../Links/CreateLink";

const Dashboard = ({ history }) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState("");

  const fetchLinks = async () => {
    try {
      const response = await linksApi.list();
      setLinks(response.data.tasks);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handlePinned = async (slug, is_pinned) => {
    try {
      setLoading(true);
      await linksApi.update(slug);
      Toastr.success(`Link ${is_pinned ? "unpinned from" : "pinned to"} top!`);
      fetchLinks();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleClicked = async slug => {
    try {
      const response = await linksApi.show(slug);
      window.open(response.data.link.original_url);
      fetchLinks();
    } catch (error) {
      logger.error(error);
    }
  };

  const createLink = async () => {
    try {
      setLoading(true);
      await linksApi.create({ link: { original_url: link } });
      setLink("");
      fetchLinks();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (!either(isNil, isEmpty)(links)) {
    return (
      <Container>
        <CreateLink
          link={link}
          loading={loading}
          setLink={setLink}
          createLink={createLink}
        />
        <ListLinks
          data={links}
          handlePinned={handlePinned}
          handleClicked={handleClicked}
        />
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-xl leading-5 text-center">You have no links 😔</h1>
    </Container>
  );
};

export default Dashboard;
