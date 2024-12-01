/* eslint-disable react-refresh/only-export-components */
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useState } from "react";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../UI/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const username = useSelector((state) => state.user.username);
  const [withPriority, setWithPriority] = useState(false);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === `submitting`;

  const formErrors = useActionData();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-6 text-xl font-semibold">
        Готов ли си да поръчаш? Да започваме!
      </h2>

      <Form method="POST">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Твоето име</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input grow"
          />
        </div>

        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          {formErrors?.phone ? (
            <label className="text-red-500 sm:basis-40">Телефонен номер</label>
          ) : (
            <label className="sm:basis-40">Телефонен номер</label>
          )}
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />

            {formErrors?.phone && (
              <p className="mt-1 rounded-xl bg-red-200 px-4 py-1 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Адрес</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
            />
          </div>
        </div>

        <div className="mb-5 flex items-center gap-1">
          <input
            className="mr-1 mt-1 h-4 w-5 accent-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="mt-1 text-sm font-medium" htmlFor="priority">
            {withPriority ? (
              `Твоята заявка ще бъде приоритизирана`
            ) : (
              <div className="flex flex-col">
                Искаш ли твоята заявка да е с приоритет?
                <span className="text-xs underline">
                  Цена за приоритетна обработка е 20% от общата сума
                </span>
              </div>
            )}
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? `Бързам бързам..`
              : `Поръчай сега за ${formatCurrency(totalCartPrice + priorityPrice)} лв.`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === `on`,
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = `Invalid phone number, please give us your correct phone number, we might need it to contact you.`;
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
