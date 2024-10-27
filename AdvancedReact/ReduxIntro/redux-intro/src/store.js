import { combineReducers, createStore } from "redux";

import accountReducer, {
  deposit,
  withdraw,
  payLoan,
  requestLoan,
} from "./features/accounts/accountSlice";
import customerReducer, {
  createCustomer,
  updateCustomer,
} from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

store.dispatch(createCustomer(`Alice`, `123`));

console.log(store.getState());
