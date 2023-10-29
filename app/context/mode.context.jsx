'use client'
import React, { Dispatch, createContext, useReducer } from "react";

const initialState={
    mode:"latest"
}


const reducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_MODE":
        return { ...state, mode: action.payload }; // Change the mode
      default:
        return state;
    }
  };

export function useModeContext(){
    return useContext(ModeContext)
}

  export const ModeContext = createContext({
    state: initialState,
    dispatch: () => null,
  });

  export const ModeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    // Added a function to change the mode
    const changeMode = (newMode) => {
      dispatch({ type: "CHANGE_MODE", payload: newMode });
    };
  
    return (
      <ModeContext.Provider value={{ state, dispatch, changeMode }}>
        {children}
      </ModeContext.Provider>
    );
  };