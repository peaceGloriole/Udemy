/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import Button from "../../UI/Button";
import { deleteItem } from "./cartSlice";

export default function DeleteItem({ type, pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button type={type} onClick={() => dispatch(deleteItem(pizzaId))}>
      Изтрий
    </Button>
  );
}
