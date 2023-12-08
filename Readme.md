![My workspace](my-workspace-light-mode-logo.png)

A place where you can collaborate, communicate, plan, and exchange
with your team easily.

# Getting started

### Authentication N/A

In the future, the entire apps will use `Firebase auth`.

### Env variables

Before running the application, we need to set up our `env` variables on each application. i.e. both client and server.
You can do it by adding a new file `.env`, then add your env variables

- Client

  P.S: for the client `.env` will be set to `.env.development`, but in production mode, we will be set to `.env.production`.
  For more information about configuring `env variable`, we can visit the docs by [Vite.JS/env](https://vitejs.dev/guide/env-and-mode).

  ```
  VITE_API_ENPOINTS=http://localhost:8000/api/v1/
  VITE_GRAPHQL_ENDPOINTS=http://localhost:8000/graphql
  ```

- Server

  ```
  PORT=8000
  DATABASE_LOCAL="mongodb://127.0.0.1:27017/my-workspaces"
  DATABASE_URL= ... your MongoDB Atlas endpoint ...
  ```

### Local dev

After cloning the project on my repository, we can follow these commandes to run the application. And please sure that you are in the project root directories.

```
// for cloning project
git clone https://github.com/nirinasoa-herilanto/my-workspace.git
```

- Client (React.JS + Vite)

  ```
  cd .\client\

  // you need to install all dependencies
  npm install

  // to run the application
  npm run dev
  ```

  By default the client app will be available on [http://localhost:5173](http://localhost:5173)

- Server (Node.JS & Express)

  ```
  cd .\server\

  // you need to install all dependencies
  npm install

  // to run the application
  npm run dev
  ```

  By default the server app will be available on [http://localhost:8000/api/v1/](http://localhost:8000/api/v1/) and the graphql server on [http://localhost:8000/graphql](http://localhost:8000/graphql)

# Deployment N/A

# Author

Nirinasoa Herilanto
