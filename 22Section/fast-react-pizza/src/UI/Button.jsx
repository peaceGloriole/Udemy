// eslint-disable-next-line react/prop-types
export default function Button({ children, disabled }) {
  return (
    <button
      disabled={disabled}
      className="duration-400 mt-1 inline-block rounded-lg bg-yellow-400 px-4 py-2 font-semibold uppercase tracking-wide text-stone-600 transition-colors hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 active:bg-stone-600 active:text-yellow-400"
    >
      {children}
    </button>
  );
}
