import { combineReducers } from "redux";
import filterReducer from "./filterReducer";
import anecdoteReducer from "./anecdoteReducer";

const rootReducer = combineReducers({
  filter: filterReducer,
  anecdotes: anecdoteReducer,
});

export default rootReducer;