import React, { FormEvent } from "react";
import { useHistory, useLocation } from "react-router-dom";
import qs from "qs";
import dataTypeOptions from "../constants/dataTypeOptions";

import "./ControlBar.scss";

const ControlBar = () => {
  const history = useHistory();
  const location = useLocation();

  const onClickCheckbox = (name: string, e: FormEvent<HTMLInputElement>) => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    query[name] = e.currentTarget.checked.toString();

    history.push({
      pathname: location.pathname,
      search: qs.stringify(query),
    });
  };

  return (
    <header className="ControlBar">
      {dataTypeOptions.map(({ label, name }) => {
        return (
          <label key={name}>
            {label}
            <input
              type="checkbox"
              name={name}
              onClick={(e) => onClickCheckbox(name, e)}
            />
          </label>
        );
      })}
    </header>
  );
};
export default ControlBar;
