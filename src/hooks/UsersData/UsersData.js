import { useState, useEffect } from "react";

export const UsersData = () => {
  const [usersData, setUsersData] = useState([]);
  const [usersError, setUsersError] = useState(null);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  useEffect(() => {
    const cachedUsers = localStorage.getItem("users");
    if (cachedUsers) {
      setUsersData(JSON.parse(cachedUsers));
    } else {
      const fetchData = async () => {
        setIsLoadingUsers(true);
        try {
          const response = await fetch("users");
          const users = await response.json();
          setTimeout(() => {
            localStorage.setItem("users", JSON.stringify(users));
            setUsersData(users);
            setUsersError(null);
            setIsLoadingUsers(false);
          }, 5000);
        } catch (e) {
          setUsersData([]);
          setUsersError(e.message);
          setIsLoadingUsers(false);
        }
      };
      fetchData();
    }
  }, []);

  return [usersData, usersError, isLoadingUsers];
};

export default UsersData;
