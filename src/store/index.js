import MineReducer from "./reducers";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  mineState: MineReducer
});
export default appReducer;
