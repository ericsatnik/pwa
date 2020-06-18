import React from "react";

export const UsersList = ({ usersError, usersData, isLoadingUsers }) => {
  console.log("isLoadingUsers", isLoadingUsers);
  console.log("usersError", !usersError);
  console.log(
    "hasUsers",
    usersData && usersData.length !== 0 && !isLoadingUsers
  );
  console.log(
    "hasNoUsers",
    usersData && usersData.length === 0 && !isLoadingUsers
  );
  const hasUsers = usersData && usersData.length !== 0 && !isLoadingUsers;
  const hasNoUsers = usersData && usersData.length === 0 && !isLoadingUsers;
  return (
    <>
      {isLoadingUsers && <p>Loading...</p>}
      {usersError && <p>{usersError}</p>}
      {hasNoUsers && (
        <div>
          <h1>Users:</h1>
          <p>No users could be found</p>
        </div>
      )}
      {hasUsers && (
        <div>
          <h1>Users:</h1>
          <ul>
            {!!usersData &&
              usersData.map((user) => <li key={user.id}>{user.username}</li>)}
          </ul>
        </div>
      )}
    </>
  );
};

export default UsersList;
