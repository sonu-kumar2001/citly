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
      setLinks(response.data.links);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handlePinned = async slug => {
    try {
      setLoading(true);
      await linksApi.update(slug);
      fetchLinks();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleClicked = visit => {
    setTimeout(() => {
      fetchLinks();
    }, 1000);
    window.open(visit, "_blank");
  };

  const handleSubmit = async () => {
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
          handleSubmit={handleSubmit}
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
      <CreateLink
        link={link}
        loading={loading}
        setLink={setLink}
        handleSubmit={handleSubmit}
      />
      <h1 className="text-xl leading-5 text-center mt-5">
        You have no links 😔
      </h1>
    </Container>
  );
};

export default Dashboard;
