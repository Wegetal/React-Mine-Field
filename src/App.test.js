import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Board from "./components/Board";
import Cell from "./components/Cell";
import appReducer from "./store";
const store = createStore(appReducer);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("Board, sem conexões removidas", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Board />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("Board, com o Provider", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Board />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("Cell", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Cell />, div);
  ReactDOM.unmountComponentAtNode(div);
});
