import { useSelector } from "react-redux";

function Customer() {
  const customer = useSelector((store) => store.customer.fullName);

  return customer ? (
    <h2>👋 Welcome, {customer} </h2>
  ) : (
    <h2>👋 Welcome, guest </h2>
  );
}

export default Customer;
