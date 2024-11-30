/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const base = `duration-400 mt-1 inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-600 transition-colors hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 active:bg-stone-600 active:text-yellow-400`;
export default function Button({ children, disabled, to, type }) {
  const styles = {
    primary: base + ` px-4 py-2 md:px-4 md:py-2`,
    small: base + ` py-2 px-3 md:px-3 md:py-2 text-xs`,
    secondary: ` py-2 px-3 md:px-3 md:py-2 duration-400 mt-1 inline-block rounded-full bg-stone-300 font-semibold uppercase tracking-wide text-stone-600 transition-colors hover:bg-stone-400 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 active:bg-stone-400 active:text-stone-100`,
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}
