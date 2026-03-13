import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "Token is required to be added in the blacklist"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 172800,
  },
});

const blacklistTokenModel = mongoose.model(
  "BlacklistToken",
  blacklistTokenSchema,
);

export default blacklistTokenModel;
