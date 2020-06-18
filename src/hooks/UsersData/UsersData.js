import { useState, useEffect } from "react";
import db from "../../db/db";

// get UsersData using Cache, Refresh, Update strategy

export const UsersData = () => {
  const [usersData, setUsersData] = useState([]);
  const [usersError, setUsersError] = useState(null);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchCachedUsersAndUpdate = async () => {
      try {
        setIsLoadingUsers(true);
        // fetch users from indexedDB
        const cachedUsers = await db.table("users").toArray();
        // update UI
        setUsersData(cachedUsers);
        setIsLoadingUsers(false);
        setUsersError(null);
        return cachedUsers;
      } catch (e) {
        setUsersError(e.message);
        setIsLoadingUsers(false);
      }
    };

    const bulkPutUsers = async (users = []) => {
      try {
        setIsLoadingUsers(true);
        // put fresh users into indexedDB (clears previous results)
        console.log("users", users);
        await db.table("users").clear();
        await db.table("users").bulkPut(users);
        setIsLoadingUsers(false);
        setUsersError(null);
      } catch (e) {
        setUsersError(e.message);
        setIsLoadingUsers(false);
      }
    };

    const refreshAndUpdateUsers = async (cachedUsers) => {
      if (!navigator.onLine) {
        //Cannot refresh data while offline
      }
      if (cachedUsers.length === 0) {
        // only show loading when there are no cached users
        setIsLoadingUsers(true);
      }
      if (navigator.onLine) {
        try {
          // Refresh users from API
          const response = await fetch("users");
          const users = await response.json();
          setTimeout(() => {
            bulkPutUsers(users);
            // update UI
            setUsersData(users);
            setUsersError(null);
            setIsLoadingUsers(false);
          }, 1000);
        } catch (e) {
          // app should fallback to cached data when server is unavailable
          const prodFailSafe = cachedUsers && e.message === "Failed to fetch";
          const devFailSafe =
            cachedUsers &&
            e.message === "Unexpected token P in JSON at position 0";
          const failSafe = prodFailSafe || devFailSafe;
          if (!failSafe) {
            setUsersError(e.message);
          }
          setIsLoadingUsers(false);
        }
      }
    };

    // fetch users from indexedDB and update UI, then, if online, fetch users from API, put users into indexedDB (clears previous results), update UI
    fetchCachedUsersAndUpdate().then((cachedUsers) => {
      refreshAndUpdateUsers(cachedUsers);
    });
  }, []);

  return [usersData, usersError, isLoadingUsers];
};

export default UsersData;
