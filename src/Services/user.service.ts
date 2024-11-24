import { User } from "../Models/users";
import { Role } from "../Models/roles";
import { config } from "../Config/auth.config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";

interface IRoles {
  // _id: Types.ObjectId;
  name: string;
}

export async function register(data: any) {
  const user = new User({
    username: data.username,
    email: data.email,
    password: bcrypt.hashSync(data.password, 8),
  });
  try {
    const savedUser = await User.create(user);
    if (data.roles) {
      const roles: any = await Role.find({ name: { $in: data.roles } });
      console.log(roles);
      if (roles) {
        savedUser.roles = roles.map((role: any) => role._id);
        savedUser.save();
      }
    } else {
      const role: any = await Role.findOne({ name: "user" });
      console.log(role);
      savedUser.roles = [role._id];
      savedUser.save();
    }
    return savedUser;
  } catch (error) {
    return error;
  }
}

export async function signIn(username: string, password: string) {
  try {
    const user = await User.findOne({ username }).populate("roles", "-__v");

    if (!user) {
      throw new Error("1");
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      throw new Error("2");
    }

    const token = jwt.sign({ id: user._id, roles: user.roles }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    return token;
  } catch (error) {
    throw error;
  }
}

export async function getUsers() {
  try {
    const users = User.find({});
    return users;
  } catch (error) {
    return error;
  }
}
