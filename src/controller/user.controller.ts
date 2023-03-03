import { Request, Response } from "express";
import { omit, Omit } from "lodash";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);

    res.status(201).send(omit(user.toJSON(), "password"));
  } catch (e: any) {
    console.error(e);
    return res.status(409).send(e.message);
  }
}
