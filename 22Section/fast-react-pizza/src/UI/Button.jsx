/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const className = `duration-400 mt-1 inline-block rounded-lg bg-yellow-400 px-4 py-2 font-semibold uppercase tracking-wide text-stone-600 transition-colors hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 active:bg-stone-600 active:text-yellow-400 sm:px-4 sm:py-2`;

export default function Button({ children, disabled, to }) {
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} className={className}>
      {children}
    </button>
  );
}
