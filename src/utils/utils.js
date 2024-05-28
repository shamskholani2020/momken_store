import i18next from "i18next";
import { useContext, useEffect } from "react";

import { StoreContext } from "../context/store/store";
import { useState } from "react";

// export const baseURL = "http://localhost:3000";

export const baseURL = "https://server.momken.app";

const params = new URLSearchParams(window.location.search);

// export const storeId = window.location.hostname.split(".")[0];
export const storeId = params.get("store");

export const headers = {
  headers: {
    credentials: true,
    "Access-Control-Allow-Origin": "*",
    // authorization: "6605caa1f3ed2aa4001c8c78",
    // Authorization: "6605caa1f3ed2aa4001c8c78",
    // client: "6605caa1f3ed2aa4001c8c78",
    authorization: storeId,
    Authorization: storeId,
    client: storeId,

    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

// export const socket = io(baseURL);
export const socket = "";

export const isDraft = () => {
  const params = new URLSearchParams(window.location.search);

  return params.get("isDraft") === "true" ? true : false;
};

export const getEdits = (setStore) => {};

export const useTheme = () => {
  const { store } = useContext(StoreContext);

  if (store) {
    let theme = store?.props?.theme;

    return theme;
  }
};

export const isArabic = localStorage.getItem("lang") == "ar" ? true : false;

export const changeLanguageFunction = (lang) => {
  i18next.changeLanguage(lang);
  document.body.dir = i18next.dir();
  localStorage.setItem("lang", i18next.language);
  window.location.reload();
};

export const currentLanguage = () => i18next.language;

export const useCurrency = () => {
  const { store } = useContext(StoreContext);
  return store?.props?.theme?.currency[currentLanguage()];
};

export const extractValueAndUnit = (value) => {
  if (value != "" && value != null) {
    const match = value?.match(/^(\d+)(em|rem|vh|vw|%|px|auto)$/);
    if (match) {
      return { number: match[1] ? match[1] : 0, unit: match[2] ?? "px" };
    }
    return { number: "", unit: "px" };
  } else {
    return { number: "", unit: "px" };
  }
};

export const useActiveBreakpoint = () => {
  const theme = useTheme();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (theme) {
    if (theme?.layout) {
      const layout = theme?.layout;

      const desktop = extractValueAndUnit(layout.desktop?.pageWidth)?.number;
      const tablet = extractValueAndUnit(layout.tablet?.pageWidth)?.number;
      const mobile = extractValueAndUnit(layout.mobile?.pageWidth)?.number;

      const breakpoints = { lg: desktop, md: tablet, sm: mobile };
      const newBreakpoint =
        Object.entries(breakpoints).find(
          ([key, value]) => width >= value
        )?.[0] || "sm";

      return newBreakpoint;
    } else {
      console.log("NO LAYOUT");
    }
  } else {
    console.log("NO THEME");
  }
};
