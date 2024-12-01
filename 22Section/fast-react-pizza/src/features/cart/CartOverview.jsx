import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalPrice = useSelector(getTotalCartPrice);
  const [isItemAdded, setIsItemAdded] = useState(false);

  useEffect(() => {
    if (totalCartQuantity > 0) {
      setIsItemAdded(true);
      const interval = setInterval(() => {
        setIsItemAdded(true);
        const timer = setTimeout(() => {
          setIsItemAdded(false);
        }, 1000);

        return () => clearTimeout(timer);
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [totalCartQuantity]);

  if (!totalCartQuantity) {
    return null;
  }

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 uppercase text-stone-200 sm:px-6 md:text-base">
      <div className="flex items-center space-x-4 text-sm font-semibold text-stone-400 sm:space-x-6">
        {totalCartQuantity > 1 ? (
          <span>{totalCartQuantity} пици</span>
        ) : (
          <span>{totalCartQuantity} пица</span>
        )}
        <span>{formatCurrency(totalPrice)} лева</span>
      </div>
      <span className="text-xs font-semibold text-stone-400">
        Copyright &copy; 2024
      </span>
      <Link
        to="/cart"
        className={`sad text-sm font-semibold ${isItemAdded ? `animate-pulse text-yellow-400` : `text-black-200`}`}
      >
        <span className="mr-2 text-xl">&rarr;</span>Отвори количка
      </Link>
    </div>
  );
}

export default CartOverview;
