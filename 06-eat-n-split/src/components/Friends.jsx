/* eslint-disable react/prop-types */
import Friend from './Friend';
const Friends = ({ friends, selectedFriend, onSelection }) => {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
};

export default Friends;
