import { combineReducers, createStore } from "redux";
import accountReducer from "./accountReducer";
import customerReducer from "./customerReducer";

const store = createStore(rootReducer);

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
