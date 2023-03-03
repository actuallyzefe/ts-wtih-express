import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validate from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  app.get("/test", (req: Request, res: Response) => {
    res.send("ıt worked");
  });

  app.post("/api/users/signup", validate(createUserSchema), createUserHandler);
}

export default routes;
