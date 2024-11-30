import LinkButton from "../../UI/LinkButton";
import Button from "../../UI/Button";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const fakeCart = [
  {
    pizzaId: 12,
    name: `Mediterranean`,
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: `Vegetale`,
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: `Spinach and Mushroom`,
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = fakeCart;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">Обратно към менюто</LinkButton>

      <h2 className="ml-4 mt-7 text-lg font-semibold">
        Твоята количка, {username}
      </h2>

      <ul className="mt-3 divide-y divide-stone-400 border-b">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button type="primary" to="/order/new">
          Поръчай си пица
        </Button>
        <Button type="secondary">Изчисти количка</Button>
      </div>
    </div>
  );
}

export default Cart;
