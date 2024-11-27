/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";

export default function LinkButton({ children, to }) {
  const navigate = useNavigate();

  if (to === `-1`) {
    return (
      <button
        className="text-sm text-blue-400 hover:text-blue-700 hover:underline"
        onClick={() => navigate(-1)}
      >
        &larr; {children}
      </button>
    );
  }
  return (
    <Link
      to={to}
      className="text-sm text-blue-400 hover:text-blue-700 hover:underline"
    >
      &larr; {children}
    </Link>
  );
}
