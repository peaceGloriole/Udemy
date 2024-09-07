import Button from "../Button";

export default function FriendAddForm({
  formProps: {
    handleSubmit,
    name,
    setName,
    image,
    setImage,
    clicked,
    handleClick,
  },
}) {
  return (
    <>
      <Button onClick={handleClick}>{clicked ? "Close" : "Add Friend"}</Button>

      {clicked && (
        <form className="form-add-friend" onSubmit={handleSubmit}>
          <label>Friend name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <Button>Add</Button>
        </form>
      )}
    </>
  );
}
