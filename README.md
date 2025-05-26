# Movie Review Backend

A backend app to handle movie reviews with user authentication.

## Stack

- Node.js
- Express
- MongoDB with Mongoose

## Installation

1. Clone the repository

```
   git clone https://github.com/your-username/movie-review-backend.git
```

2. Install depenencies

```
   cd backend
   npm i
```

3. Create a .env file inside the backend folder

```
  PORT=4000
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  JWT_EXPIRES_IN=3h
```

4. Start the server

```
   node server.js
```
