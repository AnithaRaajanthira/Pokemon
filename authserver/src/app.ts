import '#db';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { authRoutes } from '#routes';
import { errorHandler, notFoundHandler } from '#middleware';
import { CLIENT_BASE_URL } from '#config';

const app = express();
const port = process.env.PORT || '3000';

app.use(
  cors({
    origin: CLIENT_BASE_URL, // for use with credentials, origin(s) need to be specified
    credentials: true, // sends and receives secure cookies
    exposedHeaders: ['WWW-Authenticate'] // needed to send the 'refresh trigger''
  })
);

app.use(express.json(), cookieParser());

app.use('/auth', authRoutes);

app.use('*splat', notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Auth Server listening on port ${port}`);
});
