import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="my-8 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-center text-xl font-semibold md:text-3xl">
        Най-добрата пица.
        <br />
        <span className="text-yellow-500">
          Направо от фурната, директно до вас.
        </span>
      </h1>

      {username === `` ? (
        <CreateUser />
      ) : (
        <Button to={`/menu`} type={`primary`}>
          Продължи с пазаруването, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
