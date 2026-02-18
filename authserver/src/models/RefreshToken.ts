import { Schema, model } from 'mongoose';
import { REFRESH_TOKEN_TTL } from '#config';

const refreshTokenSchema = new Schema(
  {
    // TODO: create a mongoose schema for storing refresh tokens
    // this should include at least the token itself and expireAt
    // expireAt: https://mongoosejs.com/docs/api/schemadateoptions.html#SchemaDateOptions.prototype.expires
    // You could also store additional information like the userId or device info in more elaborate cases
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

const RefreshToken = model('RefreshToken', refreshTokenSchema);

export default RefreshToken;
