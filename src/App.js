import React, { useState, useEffect } from "react";
import { UsersList } from "./components/UsersList/UsersList";
import logo from "./logo.svg";
import "./App.css";

function App() {
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
          console.log(usersError);
          setIsLoadingUsers(false);
        }
      };
      fetchData();
    }
  }, [usersError]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br />
      </header>
      <main className="App-main">
        <UsersList
          usersError={usersError}
          usersData={usersData}
          isLoadingUsers={isLoadingUsers}
        />
      </main>
    </div>
  );
}

export default App;
