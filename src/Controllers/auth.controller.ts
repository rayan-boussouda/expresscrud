import { Request, Response } from "express";
import { register, getUsers, signIn } from "../Services/user.service";

export const signUp = async (req: Request, res: Response) => {
  try {
    const user = await register(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const connect = async (req: Request, res: Response) => {
  try {
    const user = await signIn(req.body.username, req.body.password);
    res.status(201).send(user);
  } catch (error: any) {
    console.log(error);
    res.status(500).send({ message: error.message }); // Send an error response to the client
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const user = await getUsers();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
