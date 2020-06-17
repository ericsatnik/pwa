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
        console.log("fetch users from indexedDB");
        await db
          .table("users")
          .toArray()
          .then((users) => {
            console.log("update UI");
            console.log("users", users);
            setUsersData(users);
            setIsLoadingUsers(false);
          });
      } catch (e) {
        setUsersError(e);
        setIsLoadingUsers(false);
      }
    };

    const bulkPutUsers = async (users = []) => {
      try {
        setIsLoadingUsers(true);
        console.log("put fresh users into indexedDB (clears previous results)");
        console.log("users", users);
        await db.table("users").clear();
        await db.table("users").bulkPut(users);
        setIsLoadingUsers(false);
      } catch (e) {
        setUsersError(e);
        setIsLoadingUsers(false);
      }
    };

    const refreshAndUpdateUsers = async () => {
      if (navigator.onLine) {
        try {
          setIsLoadingUsers(true);
          console.log("Refresh users from API");
          const response = await fetch("users");
          const users = await response.json();
          setTimeout(() => {
            bulkPutUsers(users);
            console.log("update UI");
            console.log("users", users);
            setUsersData(users);
            setUsersError(null);
          }, 300);
        } catch (e) {
          setUsersError(e.message);
          setIsLoadingUsers(false);
        }
      }
    };

    // fetch users from indexedDB and update UI, then, if online, fetch users from API, put users into indexedDB (clears previous results), update UI
    fetchCachedUsersAndUpdate().then(() => {
      refreshAndUpdateUsers();
    });
  }, []);

  return [usersData, usersError, isLoadingUsers];
};

export default UsersData;
