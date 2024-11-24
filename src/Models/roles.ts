import { Schema, model, Types } from "mongoose";
import Joi from "joi";

export const RolesschemaValidate = Joi.object({
  name: Joi.string().required(),
});

interface IRoles {
  name: string;
}

const rolesSchema = new Schema<IRoles>({
  name: String,
});

export const Role = model<IRoles>("Role", rolesSchema);
