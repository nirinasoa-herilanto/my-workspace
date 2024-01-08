![My workspace](my-workspace-light-mode-logo.png)

A place where you can collaborate, communicate, plan, and exchange
with your team easily.

# Getting started

### 1 - Project management

To stay organized on this project, I use `Notion`. We can learn about the application by clicking this [link](https://nhr-it.notion.site/f4c2504c3aee467ea2c9b744968a76e9?v=11fa2dfc0d66476696649ffc202d291f&pvs=4).

For questions, any advice for improving the app, and more. Feel free to contact me, here is my email address [nirinasoa.herilanto@gmail.com](nirinasoa.herilanto@gmail.com).

P.S. _The Notion's page will be updated later until the project will be completed. 😉_

### 2 - Authentication

The app use third-party `Firebase auth` service for managing users authentication.

### 3 - Env variables

Before running the application, we need to set up our `env` variables on each application. i.e. both client and server.
You can do it by adding a new file `.env`, then add your env variables

- Client

  P.S: for the client `.env` will be set to `.env.development`, but in production mode, we will be set to `.env.production`.
  For more information about configuring `env variable`, we can visit the docs by [Vite.JS/env](https://vitejs.dev/guide/env-and-mode).

  ```
  VITE_API_ENPOINTS=http://localhost:8000/api/v1/
  VITE_GRAPHQL_ENDPOINTS=http://localhost:8000/graphql
  VITE_SIGNUP_LINK_REDIRECTION=http://localhost:5173/complete-registration
  VITE_FORGOT_PASSWORD_LINK_REDIRECTION=http://localhost:5173/auth?tab=login
  VITE_API_KEY_FIREBASE=...
  VITE_AUTH_DOMAIN_FIREBASE=...
  VITE_PROJECT_ID_FIREBASE=...
  VITE_STORAGE_BUCKET_FIREBASE=...
  VITE_MESSAGING_SENDER_ID_FIREBASE=...
  VITE_APP_ID_FIREBASE=...
  VITE_MEASUREMENT_ID_FIREBASE=...
  ```

- Server

  ```
  PORT=8000
  DATABASE_LOCAL="mongodb://127.0.0.1:27017/my-workspaces"
  DATABASE_URL= ... your MongoDB Atlas endpoint ...
  ```

### 4 - Local dev

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

# Acknowledgments

- All my friends for their support.
- [Marius Espejo](https://www.youtube.com/channel/UCDpd-qEwAI9wglx4tsEBAtw), for his Storybook advice.
