import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { initializeLogger } from "common/logger";
import { logger } from "common/logger";
import Dashboard from "components/Dashboard/index";
import { ToastContainer } from "react-toastify";

const App = () => {
  useEffect(() => {
    initializeLogger();
    logger.info("Log from js-logger");
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
