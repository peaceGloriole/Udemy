import { getOrder } from "../../services/apiRestaurant";

import { useLoaderData } from "react-router-dom";

import OrderItem from "./OrderItem";

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

function Order() {
  const order = useLoaderData();

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-6 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Статус на поръчка #{id}</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 font-semibold uppercase tracking-wide text-red-50">
              Приоритетна
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 font-semibold uppercase tracking-wide text-green-50">
            {status} поръчка
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-300 px-4 py-3">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Само ${calcMinutesLeft(estimatedDelivery)} минути до пристигането`
            : `Поръчката трябва да е пристигнала`}
        </p>
        <p className="text-xs font-semibold text-stone-500">
          (Приблизително време: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-300 border-b border-t border-stone-300">
        {cart.map((item) => (
          <OrderItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-300 px-4 py-4">
        <p className="text-sm font-medium text-stone-500">
          Цена на поръчката: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-500">
            Цена за приоритизация: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          Колко трябва да платиш: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.id);
  return order;
}

export default Order;
