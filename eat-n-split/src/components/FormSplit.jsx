import { useState } from "react";
import Button from "./Button";

export default function FormSplit({ friends }) {
  const [bill, setBill] = useState(``);
  const [userExpense, setUserExpense] = useState(``);
  const paidByFriend = bill ? bill - userExpense : "";
  const [whoIsPaying, setWhoIsPaying] = useState(`user`);

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {friends.name}</h2>

      <label>. Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>. Your expense</label>
      <input
        type="text"
        value={userExpense}
        onChange={(e) =>
          setUserExpense(
            Number(e.target.value) > bill ? userExpense : Number(e.target.value)
          )
        }
      />
      <label>. {friends.name} expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>. Who is paying the bill</label>

      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{friends.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
