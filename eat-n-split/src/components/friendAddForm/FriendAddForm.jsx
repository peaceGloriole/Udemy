import { useState } from "react";
import Button from "../Button";

export default function FriendAddForm() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked((prevClick) => !prevClick);
  };

  return (
    <>
      <Button onClick={handleClick}>{clicked ? "Close" : "Add Friend"}</Button>

      {clicked && (
        <form className="form-add-friend">
          <label>Friend name</label>
          <input type="text" />

          <label>Image URL</label>
          <input type="text" />

          <Button>Add</Button>
        </form>
      )}
    </>
  );
}
