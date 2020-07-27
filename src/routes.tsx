import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

import Todo from "./Todo";

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Todo} />
    </BrowserRouter>
  );
}
