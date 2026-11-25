# Hero Admin Panel

A small admin panel for managing a list of heroes: add, delete and filter them by element. Built as a learning project to practice Redux Toolkit and RTK Query.

**Live demo:** https://marymih.github.io/hero-admin-panel/

## Features

- List of heroes loaded from a REST API
- Add a hero with name, description and element
- Delete a hero
- Filter heroes by element (fire, water, wind, earth)
- Loading and error states

## Stack

React, Redux Toolkit, RTK Query, createAsyncThunk, Bootstrap, Sass, react-transition-group.
Mock REST API: [JSON Server](https://github.com/typicode/json-server) ([heroes-json](https://github.com/marymih/heroes-json), deployed on Vercel).

## Run locally

```bash
git clone https://github.com/marymih/hero-admin-panel.git
cd hero-admin-panel
npm install
```

By default the app uses the deployed API. To use a local JSON Server instead, open `.env`, uncomment `REACT_APP_BASE_URL=http://localhost:3001/` and comment out the Vercel URL. Then:

```bash
npm start
```

This starts the React dev server and JSON Server (port 3001) together.
