import React from "react";
import { IconContext } from "react-icons";
import { getBackgroundColorProps } from "../../../getBackgroundColorProps";
import allIcons from "../../../../utils/allIcons";

export default function IconBuilder({ el, activeBreakpoint }) {
  return (
    <IconContext.Provider
      value={{
        size: el?.options?.size[activeBreakpoint] || "2rem",
        color: getBackgroundColorProps(el, el?.fill[0])?.color,
      }}
    >
      {React.createElement(allIcons[el?.options?.iconName])}
    </IconContext.Provider>
  );
}
