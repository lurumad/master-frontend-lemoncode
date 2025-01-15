import React from "react";
import { createRoot } from "react-dom/client";
import { HelloWorldComponent } from "./helloWorldComponent";
import "./mystyles.scss";
import logo from "./content/logo_1.png";

const root = createRoot(document.getElementById("root"));
root.render(
  <div>
    <h1>Lemoncode</h1>
    <img src={logo} alt="Lemoncode rocks!!!" />
    <HelloWorldComponent />
  </div>
);
