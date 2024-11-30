import LinkButton from "../../UI/LinkButton";
import Button from "../../UI/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">Обратно към менюто</LinkButton>

      {cart.length > 0 ? (
        <h2 className="ml-4 mt-7 text-lg font-semibold">
          Твоята количка, {username}
        </h2>
      ) : (
        <h2 className="ml-4 mt-7 text-lg font-semibold">
          Твоята количка е празна :(, {username}
        </h2>
      )}

      <ul className="mt-3 divide-y divide-stone-400 border-b">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      {cart.length > 0 ? (
        <div className="mt-6 space-x-2">
          <Button type="primary" to="/order/new">
            Поръчай си пица
          </Button>
          <Button type="secondary" onClick={() => dispatch(clearCart())}>
            Изчисти количка
          </Button>
        </div>
      ) : (
        <div className="mt-6 space-x-2">
          <Button type="primary" to="/menu">
            Прегледай Менюто
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cart;
