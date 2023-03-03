import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInputs {
  email: string;
  firstName: string;
  password: string;
}

export interface UserDocument extends mongoose.Document, UserInputs {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePass: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePass: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePass, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
