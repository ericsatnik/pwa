import React from "react";
import { UsersList } from "./components/UsersList/UsersList";
import { UsersData } from "./hooks/UsersData/UsersData";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [usersData, usersError, isLoadingUsers] = UsersData();

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
        <div>
          <pre>usersError: {JSON.stringify(usersError, null, 2)}</pre>
          <pre>isLoadingUsers: {JSON.stringify(isLoadingUsers, null, 2)}</pre>
        </div>
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
