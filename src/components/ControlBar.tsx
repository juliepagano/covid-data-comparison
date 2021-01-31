import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import qs from "qs";

import "./ControlBar.scss";

const ControlBar = () => {
  const history = useHistory();
  const location = useLocation();

  const onClickShowStates: React.FormEventHandler<HTMLInputElement> = (e) => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    query.showStates = e.currentTarget.checked.toString();

    history.push({
      pathname: location.pathname,
      search: qs.stringify(query),
    });
  };

  const onClickShowUS: React.FormEventHandler<HTMLInputElement> = (e) => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    query.showUS = e.currentTarget.checked.toString();

    history.push({
      pathname: location.pathname,
      search: qs.stringify(query),
    });
  };

  return (
    <header className="ControlBar">
      <label>
        State Covid Data
        <input type="checkbox" onClick={onClickShowStates} />
      </label>
      <label>
        US Covid Data
        <input type="checkbox" onClick={onClickShowUS} />
      </label>
    </header>
  );
};
export default ControlBar;
