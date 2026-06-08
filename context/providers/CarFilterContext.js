"use client";

import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "../reducer/carFilterReducer";

const CarFilterContext = createContext();

export const CarFilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CarFilterContext.Provider value={{ state, dispatch }}>
      {children}
    </CarFilterContext.Provider>
  );
};

export const useCarFilter = () => {
  const context = useContext(CarFilterContext);
  if (!context) {
    throw new Error("useCarFilter must be used within CarFilterProvider");
  }
  return context;
};
