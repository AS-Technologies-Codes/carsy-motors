"use client";

import { createContext, useContext, useReducer } from "react";

import { carModalState, carModalReducer } from "../reducer/carModalReducer";

const CarModalContext = createContext();

export const CarModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(carModalReducer, carModalState);

  return (
    <CarModalContext.Provider value={{ state, dispatch }}>
      {children}
    </CarModalContext.Provider>
  );
};

export const useCarModal = () => useContext(CarModalContext);
