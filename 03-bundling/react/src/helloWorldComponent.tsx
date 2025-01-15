import React from "react";

export const HelloWorldComponent = () => {
  return <h1>Hello World from {process.env.STAGE}</h1>;
};
