import { useContext } from "react";
import { io } from "socket.io-client";
import { StoreContext } from "../context/store/store";

export const baseURL = "http://localhost:3000";

// export const baseURL = "https://server.momken.app";

const params = new URLSearchParams(window.location.search);

// export const storeId = window.location.hostname.split(".")[0];
export const storeId = params.get("store");

export const headers = {
  headers: {
    credentials: true,
    "Access-Control-Allow-Origin": "*",
    authorization: storeId,
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    client: storeId,
  },
};

export const socket = io(baseURL);

export const isDraft = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("isDraft") === "true" ? true : false;
};

export const getEdits = (setStore, nav) => {
  const isD = isDraft();

  if (isD) {
    socket.on("connect", () => {
      socket.on("updatestore", (data) => {
        if (data.storeName == storeId) {
          setStore(() => {
            return {
              ...data.store,
            };
          });
        }
      });

      //   socket.on("changePage", (data) => {
      //     if (data.storeName === storeId && data.sender === "client") {
      //       nav(data?.page?.url);
      //     }
      //   });
    });
  }
};

export const useTheme = () => {
  const { store } = useContext(StoreContext);

  return store?.props?.theme;
};
