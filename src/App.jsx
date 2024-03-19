import { useContext, useEffect } from "react";
import CustomRouter from "./components/Router/Router";
import { StoreContext } from "./context/store/store";

export default function App() {
  const { isLoading, handleFetchStore } = useContext(StoreContext);

  useEffect(() => {
    handleFetchStore();
  }, []);

  return !isLoading ? (
    <>
      <CustomRouter />
    </>
  ) : (
    <div className="loading loading-ring" />
  );
}
