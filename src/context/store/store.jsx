import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL, headers, storeId } from "../../utils/utils";

export const StoreContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const StoreProvider = ({ children }) => {
  const [store, setStore] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleFetchStore = () => {
    setIsLoading(true);
    console.log("THIS IS STOREID: ", storeId);

    axios
      .get(`${baseURL}/store`, headers)
      .then((response) => {
        const temp = response.data.data[0];
        setStore(temp);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching store data:", err);
        setIsLoading(false);
      });
  };
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setActiveBreakpoint("sm");
      } else if (window.innerWidth < 1024) {
        setActiveBreakpoint("md");
      } else {
        setActiveBreakpoint("lg");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log("THIS IS STORE:", store);
    if (store) {
      setIsLoading(false);
    }
  }, [store]);

  const [activeBreakpoint, setActiveBreakpoint] = useState("lg");

  const value = {
    activeBreakpoint,
    setActiveBreakpoint,

    elements,
    setElements,
    store,
    setStore,
    isLoading,
    setIsLoading,
    handleFetchStore,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
