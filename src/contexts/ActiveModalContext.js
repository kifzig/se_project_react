import React, { children, createContext, useState } from "react";

const ActiveModalContext = createContext();

const ActiveModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState("");

  return (
    <ActiveModalContext.Provider value={{ activeModal, setActiveModal }}>
      {children}
    </ActiveModalContext.Provider>
  );
};

export { ActiveModalContext, ActiveModalProvider };
