import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [context, setContext] = useState({
    gallery: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        city: "Beaver Dam",
        country: "USA",
        time: new Date(1637656114925).toLocaleString(),
      },
      {
        id: 2,
        src: "https://images.unsplash.com/reserve/HgZuGu3gSD6db21T3lxm_San%20Zenone.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        city: "Malmö",
        country: "Sweden",
        time: new Date(1637656113925).toLocaleString(),
      },
    ],
  });

  function updateContext(updates) {
    setContext((prevState) => {
      return {
        ...prevState,
        ...updates,
      };
    });
  }

  const value = [context, updateContext];

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
