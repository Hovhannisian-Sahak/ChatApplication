import React, { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import { InviteIcon } from "../assets/InviteIcon";
const ListContainer = ({ children }) => {
  return (
    <div className="user-list__container">
      <div className="user-list__header">
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
};
const UserItem = ({ setSelectedUsers, user }) => {
  const [selected, setSelected] = useState(false);
  const handleSelect = () => {
    if (selected) {
      setSelectedUsers((prevUsers) =>
        prevUsers.filter((prevUser) => prevUser !== user.id)
      );
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
    }
    setSelected((prev) => !prev);
  };
  return (
    <div className="user-item__wrapper" onClick={handleSelect}>
      <div className="user-item__name-wrapper">
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p className="user-item__name">{user.fullName || user.id}</p>
      </div>
      {selected ? <InviteIcon /> : <div className="user-item__invite-empty" />}
    </div>
  );
};
const UserList = ({ setSelectedUsers }) => {
  const { client } = useChatContext();
  console.log(client);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);
  console.log(users);
  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const res = await client.queryUsers(
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 8 }
        );
        console.log(res);
        if (res.users.length) {
          setUsers(res.users);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        setError(true);
        console.log(error);
      }
      setLoading(false);
    };
    if (client) {
      getUsers();
    }
  }, []);
  if (error) {
    return (
      <ListContainer>
        <div className="user-list__message">
          Error loading, please refresh and try again
        </div>
      </ListContainer>
    );
  }
  if (listEmpty) {
    return (
      <ListContainer>
        <div className="user-list__message">No users found</div>
      </ListContainer>
    );
  }
  return (
    <ListContainer>
      {loading ? (
        <div className="user-list__message">Loading...</div>
      ) : (
        users?.map((user, i) => {
          return (
            <UserItem
              index={i}
              key={user.id}
              user={user}
              setSelectedUsers={setSelectedUsers}
            />
          );
        })
      )}
    </ListContainer>
  );
};

export default UserList;
