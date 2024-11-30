import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 text-sm font-semibold text-stone-400 sm:space-x-6">
        <span>23 пици</span>
        <span>23.45 лева</span>
      </p>
      <Link to="/cart">Отвори количка &rarr;</Link>
    </div>
  );
}

export default CartOverview;
