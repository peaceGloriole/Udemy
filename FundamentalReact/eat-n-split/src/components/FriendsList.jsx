import Friend from "./friendItem/Friend";

export default function FriendsList({ friends, onSelect, selected }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} onSelect={onSelect} selected={selected} />
      ))}
    </ul>
  );
}
