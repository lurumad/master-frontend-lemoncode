import React from "react";
import { ListState } from "./list-state.model";

interface ListProfile {
  listState: ListState;
  setListState: (state: ListState) => void;
}

export const ListStateContext = React.createContext<ListProfile>({
  listState: {
    organization: "lemoncode",
    page: 1,
    count: 1,
  },
  setListState: () => {
    console.warn(
      "** If you area reading this, likely you have forgotten to add the provider on top of your app"
    );
  },
});

interface ListStateProps {
  children: React.ReactNode;
}

export const ListStateProvider: React.FC<ListStateProps> = ({ children }) => {
  const [listState, setListState] = React.useState<ListState>({
    organization: "lemoncode",
    page: 1,
    count: 1,
  });

  return (
    <ListStateContext.Provider value={{ listState, setListState }}>
      {children}
    </ListStateContext.Provider>
  );
};

export const useListState = () => React.useContext(ListStateContext);
