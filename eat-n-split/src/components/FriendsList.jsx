import Friend from "./friendItem/Friend";

export default function FriendsList({ friends, onSelect }) {

  return (
    <ul>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} onSelect={onSelect} />
      ))}
    </ul>
  );
}
