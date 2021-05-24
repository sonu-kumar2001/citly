import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";

import Container from "components/Container";
import PageLoader from "components/PageLoader";
import linksApi from "apis/links";

const Dashboard = ({ history }) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

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
    return <Container></Container>;
  }

  return (
    <Container>
      <h1 className="text-xl leading-5 text-center">You have no links 😔</h1>
    </Container>
  );
};

export default Dashboard;
