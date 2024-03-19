import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/store/store";
import { getEdits } from "../../utils/utils";
import ComponentBuilder from "../ComponentBuilder/ComponentBuilder";

export default function CustomRouter() {
  const { setStore, store } = useContext(StoreContext);

  const nav = useNavigate();

  useEffect(() => {
    getEdits(setStore, nav);
  }, []);

  return (
    <Routes>
      {store?.pages?.map((e, index) => (
        <Route
          key={index}
          path={e?.url}
          element={<ComponentBuilder e={e} sections={e?.sections} />}
        />
      ))}

      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}
