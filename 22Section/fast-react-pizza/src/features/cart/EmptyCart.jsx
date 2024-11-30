import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div>
      <Link to="/menu">&larr; Обратно към менюто</Link>

      <p>Количката ти все още е празна, добави пица :)</p>
    </div>
  );
}

export default EmptyCart;
