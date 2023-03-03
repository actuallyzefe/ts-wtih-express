import mongoose from "mongoose";
import config from "config";

const start = async () => {
  if (!config.get<string>("dbUri"))
    throw new Error("MONGO_URI must be defined");
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(config.get<string>("dbUri"));
    mongoose.set("strictQuery", false);

    console.log("Successfully connected to db");
  } catch (error) {
    console.log(error);
  }
};

export default start;
