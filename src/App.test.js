import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Board from "./components/Board";
import Cell from "./components/Cell";
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Board />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Cell />, div);
  ReactDOM.unmountComponentAtNode(div);
});
