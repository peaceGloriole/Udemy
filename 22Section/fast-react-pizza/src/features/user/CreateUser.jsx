import { useState } from "react";
import Button from "../../UI/Button";

function CreateUser() {
  const [username, setUsername] = useState(``);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input"
      />

      <div
        className={`mt-2 transition-opacity duration-300 ${username === `` ? `opacity-0` : `opacity-100`}`}
      >
        <Button disabled={username === ``}>Start ordering</Button>
      </div>
    </form>
  );
}

export default CreateUser;
