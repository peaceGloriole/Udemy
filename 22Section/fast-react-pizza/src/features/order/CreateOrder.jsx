/* eslint-disable react-refresh/only-export-components */
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useState } from "react";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../UI/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

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

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === `submitting`;

  const cart = fakeCart;

  const formErrors = useActionData();

  return (
    <div className="px-4 py-6">
      <h2 className="mb-6 text-xl font-semibold">
        Готов ли си да поръчаш? Да започваме!
      </h2>

      <Form method="POST">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Твоето име</label>
          <input type="text" name="customer" required className="input grow" />
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
          <label className="mt-1 font-medium" htmlFor="priority">
            {withPriority
              ? `Твоята заявка ще бъде приоритизирана`
              : `Искаш ли твоята заявка да е с приоритет?`}
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? `Бързам бързам..` : `Поръчай сега`}
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

  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
