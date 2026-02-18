# JWT Authentication Microservice

This project you're supposed to build a standalone authentication microservice using Node.js, Express, and TypeScript. You will implement a system that handles user registration, login, and token-based authentication, which can be integrated with other microservices (like the Travel Journal API and SPA).

## Project Goal

Your task is to build the core features of this authentication service. You will be provided with a basic project scaffold containing the initial Express and TypeScript setup. You will need to implement the controllers, models, and middleware to create a fully functional authentication system.

## Core Requirements

### 1. Project Structure

You are expected to create and organize your code into the following directories. This separation of concerns is a key principle of building maintainable applications.

- `src/controllers`: Contains the request handlers (controller functions) that implement the logic for each API endpoint.
- `src/models`: Defines the Mongoose schemas for your database collections (`User`, `RefreshToken`).
- `src/middleware`: Holds custom middleware functions, such as for error handling, 404 errors, and request validation.
- `src/routes`: Defines the API routes and maps them to the corresponding controller functions.
- `src/schemas`: Contains Zod schemas for validating the request bodies of incoming requests.
- `src/utils`: Includes utility functions, such as those for creating and managing JSON Web Tokens (JWTs).
- `src/config`: For managing configuration, especially environment variables.

### 2. Database Models

You will need to define these Mongoose models:

- **User**:
  - derive the Mongoose model from the zod registerSchema
  - don't include confirmPassword
  - add `roles`: `Array` of `String`, with a default value of `['user']`.
- **RefreshToken**:
  - `token`: store the opaque token string
  - Implement a TTL (Time-To-Live) index so that expired tokens are automatically removed from the database.

### 3. API Endpoints

You must implement the following API endpoints under the `/auth` route:

| Method   | Endpoint    | Description                                                                                                             |
| :------- | :---------- | :---------------------------------------------------------------------------------------------------------------------- |
| `POST`   | `/register` | Creates a new user. Hashes the password before saving. Returns an access token and a refresh token.                     |
| `POST`   | `/login`    | Authenticates a user. If credentials are correct, returns a new access and refresh token.                               |
| `POST`   | `/refresh`  | Takes a valid refresh token (sent via cookies) and returns a new access token and a new refresh token (token rotation). |
| `DELETE` | `/logout`   | Invalidates both the access and refresh tokens.                                                                         |
| `GET`    | `/me`       | Returns the user profile for the currently authenticated user, based on the access token.                               |

### 4. Authentication Logic

- **JWTs**: Use JSON Web Tokens for authentication.
  - **Access Token**: Short-lived (e.g., 15 minutes), contains user roles and ID. Sent to the client.
  - **Refresh Token**: Long-lived (e.g., 7 days), stored securely in an `httpOnly` cookie. Used to get a new access token.
- **Cookies**: Tokens should be sent to the client via cookies for security.
- **Password Hashing**: Use `bcrypt` to hash user passwords before storing them.

### 5. Validation

- Use the `zod` library to validate the body of incoming requests for the `/register` and `/login` endpoints.

### 6. Middleware

- **Error Handling**: Create a centralized error handling middleware to catch and format all errors that occur in your application.
- **Not Found**: Implement a middleware to handle requests to routes that do not exist, returning a 404 error.
- **Request Validation**: Create a middleware that uses your Zod schemas to validate request bodies.

### 7. Environment Variables

Your application should be configurable via environment variables. Create a `.env.development.local` file for local development with the following variables:

- `ACCESS_JWT_SECRET`: A secret key for signing access tokens.
- `DB_NAME`: The db name in your mongo cluster that you share with your data API.
- `CLIENT_BASE_URL`: The URL of your Frontend, needed for CORS.
- `MONGO_URI`: The connection string for your MongoDB database.
- `REFRESH_TOKEN_TTL`: The expiration time for refresh tokens (e.g., `2592000` -> 30 days).
- `SALT_ROUNDS`: The number of salt rounds for bcrypt.

Have a look at `src/config/index.ts` to see an example of how you can use `zod` to enforce and safely coerce environment variables.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Set up Environment**:
    - Create a `.env.development.local` file in the root of the project.
    - Add the environment variables listed above to this file.
3.  **Run the Development Server**:
    ```bash
    npm run dev
    ```

Have fun!
