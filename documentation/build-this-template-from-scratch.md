[View README.md](../README.md)

This template was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app) and [Express](https://github.com/expressjs/express)

# Build this template from scratch

## Step 1:

Create a new `create-react-app` project, name it create-react-app-express, and install packages

```
 npx create-react-app create-react-app-express
```

## Step 2:

Install `express` as a dependency

```
npm install express --save
```

Learn more about this package:

- [Express](https://github.com/expressjs/express)

## Step 3:

Install `nodemon` and `concurrently` as dev dependencies

```
npm install nodemon concurrently --save-dev
```

Learn more about these packages

- [nodemon](https://github.com/remy/nodemon)
- [concurrently](https://github.com/kimmobrunfeldt/concurrently)

## Step 4: Add `src/server/index.js` file

```
const express = require("express");

const app = express();

app.use(express.static("build"));

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get("/api/users", (req, res) => {
    res.json([
        {
            id: 1,
            username: "user1"
        },
        {
            id: 2,
            username: "user2"
        },
        {
            id: 3,
            username: "user3"
        }
    ]);
});

app.listen(process.env.PORT || 8080, () =>
    console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
```

## Step 5: Update `src/App.js` file

```
import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/users");
        const users = await response.json();
        setUsers(users);
      } catch (e) {
        console.log("5xx Server Error");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Users:</p>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

```

## Step 6: Add `proxy` to `package.json`

```
"proxy": "http://localhost:8080"
```

## Step 7: Update `scripts` in `package.json`

```
    "start": "concurrently \"npm run client\" \"npm run server\"",
    "client": "react-scripts start",
    "server": "nodemon src/server",
    "build": "concurrently \"react-scripts build\" \"npm run server\"",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
```

## Step 8: Start `create-react-app-express`

```
npm run start
```

Runs the app client and server in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

---

Current Benchmarks

```
Performance: 100
Accessibility: 100
Best Practices: 93
SEO: 100
PWA: Fast And Reliable 3/3, Installable: 3/3, PWA Optimized: 5/7
```

- Max Potential First Input Delay 500ms (?)
- Does not use HTTP/2 for all of its resources 17 requests not served via HTTP/2
- Does not redirect HTTP traffic to HTTPS
  If you've already set up HTTPS, make sure that you redirect all HTTP traffic to HTTPS in order to enable secure web features for all your users. Learn more.

TODO:

- Max Potential First Input Delay
- HTTP/2
- HTTPS

TODO:

- Add Refresh Data Service Worker.
- Add Background Sync Service Worker
