import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError();

  return (
    <div>
      <h1>Нещо се обърка 😢</h1>
      <p>{error.data || error.message}</p>
      <LinkButton to="-1">Go back</LinkButton>
    </div>
  );
}

export default Error;
