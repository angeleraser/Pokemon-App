import React from "react";
import { calcPercentage } from "../../../functions/calcPercentage";
import { getFormatedStr } from "../../../functions/getFormatedStr";
import { getStatBarColor } from "../../../selectors/getStatBarColor";

export const ProgressBar = ({ name, baseStat }) => {
  const percent = calcPercentage(baseStat, 252);
  return (
    <label htmlFor={name}>
      <h3>{getFormatedStr(name)}</h3>
      <p>{baseStat}</p>
      <div className="bar-wrapper w-full">
        <div
          data-stat={baseStat}
          style={{
            backgroundImage: `${getStatBarColor(baseStat)}`,
            width: `${percent}%`,
          }}
          className="bar"
          id={name}></div>
      </div>
    </label>
  );
};
