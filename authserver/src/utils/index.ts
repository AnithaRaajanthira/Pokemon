import { randomUUID } from 'node:crypto';
import type { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_TTL, ACCESS_JWT_SECRET } from '#config';
import { RefreshToken } from '#models';

type UserData = {
  roles: string[];
  _id: Types.ObjectId;
};

const createTokens = async (
  userData: UserData
): Promise<[refreshToken: string, accessToken: string]> => {
  const payload = { roles: userData.roles };
  const secret = ACCESS_JWT_SECRET;
  const tokenOptions = {
    expiresIn: ACCESS_TOKEN_TTL,
    subject: userData._id.toString()
  };

  const accessToken = jwt.sign(payload, secret, tokenOptions);

  const refreshToken = randomUUID();

  await RefreshToken.create({
    token: refreshToken,
    userId: userData._id
  });

  return [refreshToken, accessToken];
};

export { createTokens };
