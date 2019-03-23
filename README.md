# React-a-thon Host Election

Empowering the people of React-a-thon to choose their own host. 🇺🇸👨‍👨‍👧‍👦👨‍👩‍👦‍👦🇺🇸

## Installation

1. Create a new Environment file: **./client/.env**
2. Add the following environment variables:

```
SKIP_PREFLIGHT_CHECK=true
REACT_APP_GRAPHQL_URI=http://localhost:4000/graphql
REACT_APP_SUBSCRIPTION_ENDPOINT=ws://localhost:4000/graphql
```

3. Install Dependencies, build React App: `npm install`
4. Run Production app: `npm start`
5. GraphQL Playground: `http://localhost:4000`
6. Live Election Results: `http://localhost:4000/results`

## Run Development

1. Open terminal to **./api** folder: `open -a Terminal ./api`
2. Start the Development API: `api> npm start`
3. Open terminal to **./client** folder: `open -a Terminal ./client`
4. Start the Development API: `client> npm start`
5. The GraphQL Playground is running at: `http://localhost:4000`
6. The `results` React Client is running on: `http://localhost:3000`
