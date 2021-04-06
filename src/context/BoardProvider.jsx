import React, { createContext } from "react";

export const BoardContext = createContext();

export const BoardProvider = ({ children, boardData }) => {
  return (
    <BoardContext.Provider value={{ boardData }}>
      {children}
    </BoardContext.Provider>
  );
};
