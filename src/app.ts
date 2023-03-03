import config from "config";
import express from "express";
import start from "./utils/connect";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";

const app = express();
app.use(express.json());
app.use(deserializeUser);

const port = config.get<number>("port");

app.listen(port, async () => {
  console.log(`APP IS RUNNING ON ${port}`);

  await start();

  routes(app);
});
export default app;
