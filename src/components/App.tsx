import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DataContainer from "./DataContainer";
import ControlBar from "./ControlBar";
import qs from "qs";
import dataTypeOptions from "../constants/dataTypeOptions";

import "./App.scss";

function App() {
  const location = useLocation();

  const [optionsConfig, setOptionsConfig] = useState<OptionsConfig>();

  useEffect(() => {
    const queryString = qs.parse(location.search, { ignoreQueryPrefix: true });

    const newOptionsConfig: OptionsConfig = dataTypeOptions.reduce(
      (result, { label, name }) => {
        result[name] = queryString[name] === "true";
        return result;
      },
      {} as OptionsConfig
    );
    setOptionsConfig(newOptionsConfig);
  }, [location]);

  if (!optionsConfig) {
    return null;
  }

  return (
    <div className="App">
      <ControlBar optionsConfig={optionsConfig} />
      <div className="App-content">
        <DataContainer optionsConfig={optionsConfig} />
      </div>
    </div>
  );
}

export default App;
