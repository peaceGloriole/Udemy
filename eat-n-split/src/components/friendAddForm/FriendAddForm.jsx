import { useState } from "react";
import Button from "../Button";

export default function FriendAddForm() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked((prevClick) => !prevClick);
  };

  return (
    <>
      {!clicked ? (
        <Button onClick={handleClick}>Add Friend</Button>
      ) : (
        <Button onClick={handleClick}>Close</Button>
      )}

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
