import React from "react";

export const UsersList = ({ usersError, usersData, isLoadingUsers }) => (
  <>
    {!!isLoadingUsers && <p>Loading...</p>}
    {!!usersError && <p>{usersError}</p>}
    {!!usersData && usersData.length === 0 && !isLoadingUsers && (
      <div>
        <h1>Users:</h1>
        <p>No users could be found</p>
      </div>
    )}
    {!!usersData && usersData.length !== 0 && !isLoadingUsers && (
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

export default UsersList;
