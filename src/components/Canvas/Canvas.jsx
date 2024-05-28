import { Reorder, motion } from "framer-motion";
import { useContext, useMemo } from "react";

import { StoreContext } from "../../context/store/store";
import { useActiveBreakpoint, useTheme } from "../../utils/utils";
import NavbarBuilder from "./SectionBuilder/Components/NavbarBuilder";
import SectionBuilder from "./SectionBuilder/SectionBuilder";
import { useState } from "react";

export default function Canvas({ currentPage }) {
  const theme = useTheme();

  const { store } = useContext(StoreContext);

  const activeBreakpoint = useActiveBreakpoint();

  const layout =
    theme?.layout[
      activeBreakpoint === "lg"
        ? "desktop"
        : activeBreakpoint === "md"
        ? "tablet"
        : "mobile"
    ];

  const [itemBeingHovered, setItemBeingHovered] = useState();

  return (
    <motion.div
      id="viewportCanvas"
      // onClick={(event) => {
      // event.stopPropagation();
      // event.preventDefault();

      // closeContextMenu();
      // closeMediaContextMenu();
      // }}
      style={{
        gap: layout?.gap,

        paddingRight: layout?.pagePadding,
        paddingLeft: layout?.pagePadding,
        backgroundColor: theme?.palette?.background,
      }}
      className="flex flex-col items-center justify-between min-h-screen h-fit w-full relative"
    >
      <NavbarBuilder breakpoint={activeBreakpoint} />

      {window.location.pathname}

      {currentPage?.sections?.filter((el) => !el?.isDeleted)?.length == 0 && (
        <div className="h-screen w-full bg-primary/5 flex flex-col gap-5 items-center justify-center">
          <h1 className="text-2xl font-medium">Empty Page </h1>
          <p>
            You {"didn't"} add any section to your page. start adding by the
            button blow.
          </p>

          <button
            onClick={() => {
              // setIsSearchAppear(true);
            }}
            className="btn btn-primary"
          >
            Add New Section
          </button>
        </div>
      )}

      {currentPage?.sections
        ?.filter((el) => !el?.isDeleted)
        ?.map((el) => (
          <>
            <SectionBuilder
              el={el}
              activeBreakpoint={activeBreakpoint}
              handleUpdate={() => {}}
              isEditMode={false}
              itemBeingHovered={itemBeingHovered}
              setItemBeingHovered={setItemBeingHovered}
            />
          </>
        ))}

      <footer
        // onClick={(event) => {
        //   event.stopPropagation();
        // }}
        className="w-full min-h-44 bg-base-200"
      >
        {currentPage?.name}
      </footer>
    </motion.div>
  );
}
