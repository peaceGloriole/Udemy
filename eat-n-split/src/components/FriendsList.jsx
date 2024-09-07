import Friend from "./friendItem/Friend";

export default function FriendsList() {
  return (
    <ul>
      {initialFriends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  );
}
