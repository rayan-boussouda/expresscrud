import { Schema, model, Types } from "mongoose";
import Joi from "joi";

export const userSchemaValidate = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

interface IRoles {
  // _id: Types.ObjectId;
  name?: string;
}
interface IUser {
  username: string;
  email: string;
  password: string;
  roles: IRoles[];
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

export const User = model("User", userSchema);
