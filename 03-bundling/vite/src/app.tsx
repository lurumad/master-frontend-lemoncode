import React from "react";
import { Numbers } from "./numbers";
import ReactDOM from "react-dom/client";
import "./styles.css";

const App = () => {
  return <Numbers />;
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);
