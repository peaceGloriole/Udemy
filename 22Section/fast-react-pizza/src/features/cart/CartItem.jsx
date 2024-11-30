/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import { deleteItem } from "./cartSlice";
import DeleteItem from "./DeleteItem";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    return () => {
      dispatch(deleteItem(id));
    };
  };

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>
        <DeleteItem type={`small`} onClick={deleteHandler(pizzaId)} />
      </div>
    </li>
  );
}

export default CartItem;
