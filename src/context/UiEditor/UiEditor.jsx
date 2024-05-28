import React from "react";

export const UiEditorContext = React.createContext();

export const UiEditorProvider = ({ children }) => {
  return (
    <UiEditorContext.Provider value={{}}>{children}</UiEditorContext.Provider>
  );
};
