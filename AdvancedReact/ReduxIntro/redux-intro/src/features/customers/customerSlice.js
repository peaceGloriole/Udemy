const initialStateCustomer = {
  fullName: ``,
  ID: ``,
  createdAt: ``,
};

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case `customer/createCustomer`:
      return {
        ...state,
        fullName: action.payload.fullName,
        ID: action.payload.ID,
        createdAt: action.payload.createdAt,
      };
    case `customer/updateCustomer`:
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

function createCustomer(fullName, ID) {
  return {
    type: `customer/createCustomer`,
    payload: { fullName, ID, createdAt: new Date().toISOString() },
  };
}

function updateCustomer(fullName) {
  return {
    type: `customer/updateCustomer`,
    payload: { fullName },
  };
}

export { createCustomer, updateCustomer };
