import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { initializeLogger } from "common/logger";
import { logger } from "common/logger";
import Dashboard from "components/Dashboard/index";
import { ToastContainer } from "react-toastify";
import { registerIntercepts } from "apis/axios";

const App = () => {
  useEffect(() => {
    initializeLogger();
    registerIntercepts();
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
