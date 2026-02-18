Token-based authentication is the mechanism by which a server grants a client a token upon a successful verification of credentials. The client is then responsible for safe-keeping this token and send it along on every request that requires authentication, i.e. to any endpoint that is protected.

A basic flow looks like this:

1. **Login Request:** The user sends login credentials to the authentication server.
2. **Token Generation:** If the credentials are valid, the auth server generates a token containing the user's information and signs it with a secret key.
3. **Token Sent:** The auth server sends the token to the client.
4. **Subsequent Requests:** For each subsequent request, the client includes the token in the request header (usually the Authorization header, or as secure cookie).
5. **Token Validation:** The data server verifies the token's signature and checks its validity using the shared secret from the auth server. If valid, the request is processed; if not, the request is denied.
6. **Token Expiration:** Tokens typically have an expiration time, after which the user must re-authenticate to obtain a new token.

### But what is a token?

A **token** is a piece of data that represents some form of authentication or authorization information. It is used in computer systems to allow access to certain resources or to verify the identity of a user. Tokens are often used in API communication, where a client needs to prove its identity to a server.

For our specific use case, we will use something called **JWT**. **JWT** or **JSON Web Token** is a specific type of token that is widely used for securely transmitting information between parties as a JSON object. JWTs are compact, URL-safe, and can be digitally signed or encrypted. They typically consist of three parts: a header (which specifies the token type and algorithm used), a payload (which contains the claims or data), and a signature (which is used to verify the integrity of the token).

This is an example of a JWT:

```bash
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Imh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9ZFF3NHc5V2dYY1EiLCJhZG1pbiI6dHJ1ZSwiaWF0Ijo1NTQzNDI0MDAsImV4cCI6MjE0NzQ4MzY0OH0.9fxoLqai3mJRpM5N2PkPl_jrdpwvBSq8wAvZ0pk8txY
```

Where:

- **eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9** is the header
- **eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Imh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9ZFF3NHc5V2dYY1EiLCJhZG1pbiI6dHJ1ZSwiaWF0Ijo1NTQzNDI0MDAsImV4cCI6MjE0NzQ4MzY0OH0** is the payload
- **9fxoLqai3mJRpM5N2PkPl_jrdpwvBSq8wAvZ0pk8txY** is the signature

You can verify and inspect the payload of any JWT here https://jwt.io/ **.** It's important to know that what makes a token secure is the signature bit, as only a party that knows the **secret** you used to sign the token, can verify it.

JWTs are commonly used for authentication in web applications, where they enable stateless, session-based authentication mechanisms.

### Microservices Architecture

In our implementation, we've separated concerns into two distinct microservices:

1. **Auth Server** - Handles user registration, login, and token management
2. **Travel Journal API** - Handles data operations and validates access tokens for protected routes

This separation provides better scalability, maintainability, and security by isolating authentication logic from business logic.

![architecture](./architecture.png)

### And how to implement it?

The implementation of an authentication system is a fullstack project, involving actions and tasks across multiple services and the client. We are not here to lie to you, authentication is a very delicate feature that can grow a lot in terms of complexity. The goal of these lectures is that you understand the basics of these interactions so then you can either go deeper or step out and implement authentication with a third-party library! For our implementation, we can break the entire project into three components:

### Auth Server (Express.js with TypeScript)

The auth server is responsible for user management and token generation:

**Token generation**

- The access token should be a JWT, signed with a secret you can share with your data API.
- The refresh token on the other hand can simply be a random string - an opaque token. You store a reference in your database and send it to the client via a cookie.

- Process incoming requests to generate tokens. We'll create endpoints for this:
  - `POST` `/register` : Creates a user in the database and returns an access token and a refresh token
  - `POST` `/login` : Verifies credentials and returns an access token and a refresh token
  - `POST` `/refresh` : Validates refresh token and returns new access and refresh tokens
  - `DELETE` `/logout` : Invalidates refresh token and clears cookies
  - `GET` `/me`: It will receive a request with an access token and return the associated user data.

**User management**

- Store user credentials securely with password hashing
- Handle refresh token storage and rotation
- Manage token expiration and cleanup

### Travel Journal API (Express.js with TypeScript)

The data server handles business logic and requires token validation:

**Token validation**

- Protect existing resources/endpoints to make authentication mandatory. We achieve this with a `middleware` that will inspect the request for an access token and verify it using the shared secret with the auth server.
- Allow authenticated users to perform CRUD operations on blog posts.

### Client (React with TypeScript)

Authentication in the frontend is just [smoke and mirrors](https://dictionary.cambridge.org/dictionary/english/smoke-and-mirrors). There will be a lot of conditional rendering for when the user is authenticated or not. In the client, we can divide the project in three distinct phases:

**Token retrieval**

- Create matching requests to the auth server endpoints. We will create `sign up` and `sign in` forms
- Storing tokens in client with automatic refresh token handling

**Authentication state**

- Based on the presence of a token, render the appropriate UI. We will achieve this using the `Context API` and a custom layout with `React Router`
  - Redirection to authenticated routes
  - Rejection from authenticated routes
- Login persistence: if the user returns to the page and the refresh token is still valid, automatically sign them in

![frontend to auth server](./frontend_to_auth-server.png)

**Subsequent requests**

- On any subsequent request to the Travel Journal API that needs authentication, we will attach the access token
- Handle token expiration by automatically refreshing tokens when needed

![frontend to data server](./frontend_to_data-server.png)

### Implementation details

There's a package in the `npm` registry called `jsonwebtoken` by [Auth0](https://auth0.com/), a SaaS (they like to call themselves AaaS: Authentication as a Service) company that provides all things authentication. We will use it to sign our tokens and to verify them.

Here are some snippets that show the `sign` and `verify` methods of the library in action.

**Auth Server - Signing tokens**

```typescript
import type { RequestHandler } from 'express';
import { randomUUID } from 'node:crypto';
import jwt from 'jsonwebtoken';
import { RefreshToken } from '#models';

export const signUp: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    // HERE GOES THE LOGIC TO SIGN UP A USER
    const secret = process.env.ACCESS_JWT_SECRET; // This will come from the server environment
    const payload = { roles: ['user'] }; // Additional data we want to enclose in the JWT
    const accessTokenOptions = {
      expiresIn: '15m', // Short-lived access token
      subject: user._id // Store user id
    };
    const accessToken = jwt.sign(payload, secret, tokenOptions);

    const refreshToken = randomUUID;
    await RefreshToken.create({ refreshToken });

    // Store refresh token in httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days - Longer-lived refresh token
    });

    // Similarly store access token in a cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
      // omitting a maxAge here let's us check for expired access tokens later
    });

    res.status(201).json({ msg: 'Sucessfully registered' });
  } catch (e) {
    next(e);
  }
};
```

**Travel Journal API - Verifying the access token**

```typescript
import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.ACCESS_JWT_SECRET;
if (!secret) {
  console.log('Missing access token secret');
  process.exit(1);
}

const authenticate: RequestHandler = (req, _res, next) => {
  const { accessToken } = req.cookies; // requires cookie-parser dependency
  if (!accessToken) throw new Error('Not authenticated', { cause: { status: 401 } });

  try {
    const decoded = jwt.verify(accessToken, secret) as jwt.JwtPayload;
    if (!decoded.jti || !decoded.sub) throw new Error();
    const user = {
      id: decoded.sub,
      roles: decoded.roles
    };
    req.user = user;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(
        new Error('Expired access token', { cause: { status: 401, code: 'ACCESS_TOKEN_EXPIRED' } })
      );
    }
    return next(new Error('Invalid access token.', { cause: { status: 401 } }));
  }

  next();
};

export default authenticate;
```

And for sending the standart WWW-Authenticate header in case of token expiration, we can further improve our errorHandler:

```typescript
import type { ErrorRequestHandler } from 'express';

type ErrorPayload = {
  message: string;
  code?: string;
};

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  process.env.NODE_ENV !== 'production' && console.error(err.stack);
  if (err instanceof Error) {
    const payload: ErrorPayload = { message: err.message };
    if (err.cause) {
      const cause = err.cause as { status: number; code?: string };
      if (cause.code === 'ACCESS_TOKEN_EXPIRED')
        res.setHeader(
          'WWW-Authenticate',
          'Bearer error="token_expired", error_description="The access token expired"'
        );
      res.status(cause.status ?? 500).json(payload);
      return;
    }
    res.status(500).json(payload);
    return;
  }
  res.status(500).json({ message: 'Internal server error' });
  return;
};

export default errorHandler;
```

In the following lessons, we'll go onto implementing Token-based authentication with this microservices architecture in an existing TypeScript project.
