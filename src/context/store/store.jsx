import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL, headers } from "../../utils/utils";

export const StoreContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const StoreProvider = ({ children }) => {
  const [store, setStore] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const handleFetchStore = () => {
    setIsLoading(true);

    axios
      .get(`${baseURL}/store`, headers)
      .then((value) => {
        if (value.data.status) {
          setStore(value.data.data[0]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("THIS IS ERR: ", err);
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

  const [activeBreakpoint, setActiveBreakpoint] = useState("lg");

  const handleSelect = (el) => {
    if (elements?.filter((item) => item?._id == el?._id)?.length > 0) {
      const index = elements?.findIndex((ele) => ele?._id == el?._id);
      elements?.splice(index, 1);
    } else {
      elements.splice(0, elements?.length);

      elements.push(el);
    }

    setElements((prev) => {
      return [...elements];
    });

    // socket.emit("storeEdit", { _id: store?.client, elements: elements });
  };

  // useEffect(() => {
  //   socket.on("storeEdit", (data) => {
  //     if (data?._id == store?.client) {
  //       setElements(data?.elements);
  //     }
  //   });
  // }, []);

  const handleUpdate = () => {
    setStore((prev) => {
      return {
        ...store,
      };
    });

    // socket.emit("updatestore", {
    //   store: store,
    //   storeName: store?.client,
    // });
  };

  const value = {
    handleUpdate,
    activeBreakpoint,
    setActiveBreakpoint,
    handleSelect,
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
