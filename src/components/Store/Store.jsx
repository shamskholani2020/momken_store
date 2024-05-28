import { Route, Routes } from "react-router-dom";
import { storeId, useActiveBreakpoint, useTheme } from "../../utils/utils";
import Canvas from "../Canvas/Canvas";
import { useContext } from "react";
import { StoreContext } from "../../context/store/store";

export default function Store() {
  const theme = useTheme();
  const activeBreakpoint = useActiveBreakpoint();

  const { store } = useContext(StoreContext);

  return (
    <div
      style={{
        gap: theme?.layout?.gap,
      }}
      className="flex flex-col items-center justify-start"
    >
      {storeId ? (
        <Routes>
          {store?.pages?.map((page) => {
            return (
              <Route
                key={page?.name}
                path={page?.url}
                element={
                  <Canvas
                    activeBreakpoint={activeBreakpoint}
                    currentPage={page}
                    isEditMode={false}
                    setIsSearchAppear={() => {}}
                    handleUpdate={() => {}}
                  />
                }
              />
            );
          })}
        </Routes>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5 w-full h-screen bg-base-100">
          <h1>Store Not Found</h1>
        </div>
      )}
    </div>
  );
}
