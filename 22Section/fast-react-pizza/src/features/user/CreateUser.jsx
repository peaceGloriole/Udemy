import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { updateName } from "./userSlice";

import Button from "../../UI/Button";

function CreateUser() {
  const [username, setUsername] = useState(``);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!username) {
      return;
    }

    dispatch(updateName(username));
    navigate(`/menu`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Добре дошли! Моля започнете като въведете Вашето име:
      </p>

      <input
        type="text"
        placeholder="Твоето име"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input"
      />

      <div
        className={`mt-2 transition-opacity duration-300 ${username === `` ? `opacity-0` : `opacity-100`}`}
      >
        <Button type="primary" disabled={username === ``}>
          Прегледай менюто
        </Button>
      </div>
    </form>
  );
}

export default CreateUser;
