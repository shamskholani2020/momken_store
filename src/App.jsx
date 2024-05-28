import { useContext, useEffect } from "react";
import Store from "./components/Store/Store";
import { StoreContext } from "./context/store/store";

export default function App() {
  const { isLoading, handleFetchStore } = useContext(StoreContext);

  useEffect(() => {
    handleFetchStore();
  }, []);

  return !isLoading ? (
    <>
      <Store />
    </>
  ) : (
    // About. Contact. Profile. Cart. Checkout. Social Profiles Links. Input Editors. Variants
    <div className="flex flex-col items-center justify-center w-full h-screen gap-5">
      <div className="loading loading-ring" />
      <p className="text-xs font-light">Please wait until load the store.</p>
    </div>
  );
}
