import { Omit } from "lodash";
import UserModel, { UserDocument, UserInputs } from "../models/user.model";

export async function createUser(
  input: Omit<UserInputs, "createdAt" | "updatedAt" | "passwordConfirm">
) {
  try {
    return await UserModel.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
}
