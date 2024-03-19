/* eslint-disable react/prop-types */

import React, { useContext } from "react";
import { ButtonBuilder, DivBuilder, TextBuilder } from "./Builders/Builders";
import { StoreContext } from "../../context/store/store";
import { socket } from "../../utils/utils";
import { Reorder } from "framer-motion";

export default function ComponentBuilder({ e }) {
  const { setElements, store, setStore } = useContext(StoreContext);

  const activePageIndex = store?.pages?.findIndex((el) => el?.url == e?.url);

  return (
    <Reorder.Group
      values={store?.pages[activePageIndex]?.sections}
      onReorder={(newOrders) => {
        const updatedStore = { ...store };
        updatedStore.pages[activePageIndex].sections = [...newOrders];

        setStore(updatedStore);

        // socket.emit("updatestore", {
        //   store: updatedStore,
        //   storeName: updatedStore?.client,
        // });
      }}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();

        setElements([]);

        socket.emit("storeEdit", { _id: store?.client, elements: [] });
      }}
      className="min-h-screen w-full"
    >
      {/* {store?.pages[activePageIndex]?.sections?.map((el, index) =>
        el?.type == "div" ? (
          <Reorder.Item key={index} value={el}>
            <DivBuilder el={el} key={index} />
          </Reorder.Item>
        ) : el?.type == "text" ? (
          <Reorder.Item key={index} value={el}>
            <TextBuilder el={el} key={index} />
          </Reorder.Item>
        ) : (
          <Reorder.Item key={index} value={el}>
            <ButtonBuilder el={el} key={index} />
          </Reorder.Item>
        )
      )} */}
      {store?.pages[activePageIndex]?.sections?.map((el, index) => (
        <Reorder.Item value={el} key={index}>
          {el?.type == "div" && <DivBuilder el={el} />}
          {el?.type == "text" && <TextBuilder el={el} />}
          {el?.type == "button" && <ButtonBuilder el={el} />}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
