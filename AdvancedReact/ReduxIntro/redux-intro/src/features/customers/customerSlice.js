import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: ``,
  ID: ``,
  createdAt: ``,
};

const customerSlice = createSlice({
  name: `customer`,
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, ID) {
        return {
          payload: {
            fullName,
            ID,
            createdAt: new Date().toISOString(),
          },
        };
      },

      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.ID = action.payload.ID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateCustomer(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateCustomer } = customerSlice.actions;

export default customerSlice.reducer;

// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case `customer/createCustomer`:
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         ID: action.payload.ID,
//         createdAt: action.payload.createdAt,
//       };
//     case `customer/updateCustomer`:
//       return {
//         ...state,
//         fullName: action.payload,
//       };
//     default:
//       return state;
//   }
// }

// function createCustomer(fullName, ID) {
//   return {
//     type: `customer/createCustomer`,
//     payload: { fullName, ID, createdAt: new Date().toISOString() },
//   };
// }

// function updateCustomer(fullName) {
//   return {
//     type: `customer/updateCustomer`,
//     payload: fullName,
//   };
// }

// export { createCustomer, updateCustomer };
