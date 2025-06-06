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

5. Example data for movies (movies need to be added one by one)

```
{
   "title": "The Shawshank Redemption",
   "director": "Frank Darabont",
   "releaseYear": 1994,
   "genre": "Drama"
}

{
   "title": "The Godfather",
   "director": "Francis Ford Coppola",
   "releaseYear": 1972,
   "genre": "Crime"
}

{
   "title": "Pulp Fiction",
   "director": "Quentin Tarantino",
   "releaseYear": 1994,
   "genre": "Crime"
}

{
   "title": "The Dark Knight",
   "director": "Christopher Nolan",
   "releaseYear": 2008,
   "genre": "Action"
}

{
   "title": "Schindler's List",
   "director": "Steven Spielberg",
   "releaseYear": 1993,
   "genre": "History"
}
```

## Endpoints

\* = admin only (role is automatically set to "user" if no `"field": "admin"` is added in registration body)

POST /movies: Add a new movie. \*

GET /movies: Get a list of all movies.

GET /movies/:id: Get details for a specific movie.

PUT /movies/:id: Update a specific movie. \*

GET /movies/:id/reviews: Get all reviews for a specific movie.

DELETE /movies/:id: Delete a specific movie. \*

POST /reviews: Add a new review.

GET /reviews: Get a list of all reviews.

GET /reviews/:id: Get details for a specific movie.

PUT /reviews/:id: Update a specific review.

DELETE /reviews/:id: Delete a specific review.

POST /register: Register account.

POST /login: Log in.
