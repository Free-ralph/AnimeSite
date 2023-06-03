import React, { createContext, useContext, useReducer } from "react";
type Theme = "success" | "failure"
type State = {
  showToast: boolean;
  toastText: string;
  toastTheme: Theme;
};

type StateContextType = {
  state: State;
  setState: (state: Partial<State>) => void;
  Toast : (text: string, theme : Theme) => void;
  closeToast : () => void
};

type StateContextProps = {
  children: React.ReactNode;
};

const StateContext = createContext<StateContextType | undefined>(undefined);

const initailState: State = {
  showToast: false,
  toastText: "",
  toastTheme: "success",
};

function StateContextProvider({ children }: StateContextProps) {
  const [state, setState] = useReducer(
    (state: State, newState: Partial<State>): State => {
      return {
        ...state,
        ...newState,
      };
    },
    initailState
  );

  function Toast( text : string , theme : Theme ){
    setState({ toastText : text, showToast : true, toastTheme : theme})
  }

  function closeToast(){
    setState({showToast : false})
  }

  return (
    <StateContext.Provider value={{ state, setState, Toast, closeToast }}>
      {children}
    </StateContext.Provider>
  );
}

function useStateContext() {
  const context = useContext(StateContext);

  if (context) {
    return context;
  }

  throw new Error("useStateContext must be used within a StateContextProvider");
}

export { useStateContext, StateContextProvider };
