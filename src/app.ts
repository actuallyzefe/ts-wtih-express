import config from "config";
import express from "express";
import start from "./utils/connect";
import routes from "./routes";

const app = express();
app.use(express.json());
const port = config.get<number>("port");

app.listen(port, async () => {
  console.log(`APP IS RUNNING ON ${port}`);

  await start();

  routes(app);
});
export default app;
