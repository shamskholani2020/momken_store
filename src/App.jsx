import { lazy, Suspense, useContext, useEffect } from "react";

import { StoreContext } from "./context/store/store";

const Store = lazy(() => import("./components/Store/Store"));

export default function App() {
  const { isLoading, handleFetchStore, store } = useContext(StoreContext);

  useEffect(() => {
    handleFetchStore();
  }, []);

  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center w-full h-screen gap-5">
          <div className="loading loading-ring" />
          <p className="text-xs font-light">
            Please wait until load the store.
          </p>
        </div>
      }
    >
      {!isLoading && store ? (
        <>
          <Store />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-screen gap-5">
          <div className="loading loading-ring" />
          <p className="text-xs font-light">
            Please wait until load the store.
          </p>
        </div>
      )}
    </Suspense>
  );
}
