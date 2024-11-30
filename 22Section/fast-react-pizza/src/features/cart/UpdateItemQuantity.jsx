/* eslint-disable react/prop-types */
import Button from "../../UI/Button";

export default function UpdateItemQuantity({ pizzaId }) {
  return (
    <div>
      <Button type="round">-</Button>
      <Button type="round">+</Button>
    </div>
  );
}
