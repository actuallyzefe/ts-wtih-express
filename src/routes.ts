import { Express, Request, Response } from "express";
import {
  createUserSessionHandler,
  getUserSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validate from "./middleware/validateResource";
import { createSessionSchecma } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  app.get("/test", (req: Request, res: Response) => {
    res.send("ıt worked");
  });

  app.post("/api/users", validate(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validate(createSessionSchecma),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionHandler);
}

export default routes;
//
