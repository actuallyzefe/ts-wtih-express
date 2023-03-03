import { object, string, TypeOf } from "zod";
import { Omit } from "lodash";
import { createUser } from "../service/user.service";

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "Name is required",
    }),

    password: string({
      required_error: "password is required",
    }).min(6, "Min length should be 6"),

    passwordConfirm: string({
      required_error: "password confirmation is required",
    }),

    email: string({
      required_error: "Email is required",
    }).email("Not a valid emaiş"),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirm"
>;
