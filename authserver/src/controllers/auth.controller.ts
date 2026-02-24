import type { RequestHandler } from 'express';
import type { Types } from 'mongoose';
import { z } from 'zod/v4';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ACCESS_JWT_SECRET, SALT_ROUNDS } from '#config';
import { RefreshToken, User } from '#models';
import { createTokens } from '#utils';
import type { registerSchema, loginSchema, refreshTokenSchema } from '#schemas';

type RegisterDTO = z.infer<typeof registerSchema>;
type LoginDTO = z.infer<typeof loginSchema>;
type UserDTO = Omit<RegisterDTO, 'confirmPassword'>;
type RefreshTokenDTO = z.infer<typeof refreshTokenSchema>;

type UserProfile = Omit<UserDTO, 'password'> & {
  _id: InstanceType<typeof Types.ObjectId>;
  createdAt: Date;
  __v: number;
};
type SuccessResMessage = {
  message: string;
};

type TokenResBody = SuccessResMessage & {
  accessToken: string;
  refreshToken: string;
};

type MeResBody = SuccessResMessage & { user: UserProfile };

export const register: RequestHandler<{}, TokenResBody, RegisterDTO> = async (req, res) => {
  const { email, password, name } = req.body;
  const userExists = await User.exists({ email });
  if (userExists) throw new Error('Email already registered', { cause: { status: 409 } });

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPW = await bcrypt.hash(password, salt);
  const user = await User.create({
    email,
    password: hashedPW,
    name
  } satisfies UserDTO);
  const [refreshToken, accessToken] = await createTokens(user);

  res.status(201).json({ message: 'Registered', refreshToken, accessToken });
};

export const login: RequestHandler<{}, TokenResBody, LoginDTO> = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean();
  if (!user) throw new Error('Incorrect credentials', { cause: { status: 401 } });

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Incorrect credentials', { cause: { status: 401 } });

  await RefreshToken.deleteMany({ userId: user._id });
  const [refreshToken, accessToken] = await createTokens(user);
  res.json({ message: 'Welcome back', refreshToken, accessToken });
};

export const refresh: RequestHandler<{}, TokenResBody, RefreshTokenDTO> = async (req, res) => {
  const { refreshToken } = req.body;
  const storedToken = await RefreshToken.findOne({ token: refreshToken }).lean();
  if (!storedToken) throw new Error('Please sign in again', { cause: { status: 403 } });

  await RefreshToken.findByIdAndDelete(storedToken.userId);

  const user = await User.findById(storedToken._id).lean();
  if (!user) throw new Error('User account not found', { cause: { status: 403 } });

  // create new tokens with out util function
  const [newRefreshToken, newAccessToken] = await createTokens(user);
  // rend success message and new tokens in the body of the response
  res.json({ message: 'Refreshed', refreshToken: newRefreshToken, accessToken: newAccessToken });
};

export const logout: RequestHandler<{}, SuccessResMessage, RefreshTokenDTO> = async (req, res) => {
  const { refreshToken } = req.body;
  await RefreshToken.deleteOne({ token: refreshToken });
  res.json({ message: 'Successfully logged out' });
};

export const me: RequestHandler<{}, MeResBody> = async (req, res, next) => {
  const authHeader = req.header('authorization');
  const accessToken = authHeader && authHeader.split(' ')[1];
  if (!accessToken) throw Error('Please sign in', { cause: { status: 401 } });

  try {
    // verify the access token
    const decoded = jwt.verify(accessToken, ACCESS_JWT_SECRET) as jwt.JwtPayload;
    console.log('decoded:\n', decoded);

    // if decoded.sub if falsy, throw a 401 error and indicate Invalid or expired token
    if (!decoded.sub)
      throw new Error('Invalid or expired access token', { cause: { status: 401 } });

    // query the DB to find user by id that matches decoded.sub
    const user = await User.findById(decoded.sub).select('-password').lean();

    // throw a 404 error if no user is found
    if (!user) throw new Error('User not found', { cause: { status: 404 } });

    // send generic success message and user info in response body
    res.json({ message: 'Valid token', user });
  } catch (error) {
    // if error is an because token was expired, call next with a 401 and `ACCESS_TOKEN_EXPIRED' code
    if (error instanceof jwt.TokenExpiredError) {
      next(
        new Error('Expired access token', {
          cause: { status: 401, code: 'ACCESS_TOKEN_EXPIRED' }
        })
      );
    } else {
      // call next with a new 401 Error indicated invalid access token
      next(new Error('Invalid access token.', { cause: { status: 401 } }));
    }
  }
};
