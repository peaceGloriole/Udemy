/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";

const className = `text-sm text-blue-400 hover:text-blue-700 hover:underline`;
export default function LinkButton({ children, to }) {
  const navigate = useNavigate();

  if (to === `-1`) {
    return (
      <button className={className} onClick={() => navigate(-1)}>
        &larr; {children}
      </button>
    );
  }
  return (
    <Link to={to} className={className}>
      &larr; {children}
    </Link>
  );
}
