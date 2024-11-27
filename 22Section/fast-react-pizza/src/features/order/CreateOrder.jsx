import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useState } from "react";

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

const formCss = `w-full border- rounded-lg border-stone-200 px-4 py-1 transition-all duration-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2`;

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === `submitting`;

  const cart = fakeCart;

  const formErrors = useActionData();

  return (
    <div>
      <h2>Ready to order? Let`s go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required className={formCss} />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required className={formCss} />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required className={formCss} />
          </div>
        </div>

        <div>
          <input
            className="mr-1 mt-1 h-4 w-4 accent-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">
            {withPriority
              ? `Your order will be prioritized`
              : `Want to give your order priority?`}
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button
            disabled={isSubmitting}
            className="duration-400 mt-1 inline-block rounded-lg bg-yellow-400 px-4 py-2 font-semibold uppercase tracking-wide text-stone-600 transition-colors hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 active:bg-stone-600 active:text-yellow-400"
          >
            {isSubmitting ? `Placing your order..` : `Order now`}
          </button>
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