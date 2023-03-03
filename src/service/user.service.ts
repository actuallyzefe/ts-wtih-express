import { omit, Omit } from "lodash";
import UserModel, { UserDocument, UserInputs } from "../models/user.model";

export async function createUser(
  input: Omit<UserInputs, "createdAt" | "updatedAt" | "passwordConfirm">
) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });
  if (!user) return false;

  const isValid = await user.comparePassword(password);
  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}
