import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DataContainer from "./DataContainer";
import ControlBar from "./ControlBar";
import qs from "qs";

import "./App.scss";

function App() {
  const location = useLocation();

  const [showStates, setShowStates] = useState(false);
  const [showUS, setShowUS] = useState(false);

  useEffect(() => {
    const queryString = qs.parse(location.search, { ignoreQueryPrefix: true });
    setShowStates(queryString.showStates === "true");
    setShowUS(queryString.showUS === "true");
  }, [location]);

  return (
    <div className="App">
      <ControlBar />
      <div className="App-content">
        <DataContainer showStates={showStates} showUS={showUS} />
      </div>
    </div>
  );
}

export default App;
