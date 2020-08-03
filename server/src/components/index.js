"use strict";

import express from "express";
const apiRouter = express.Router();

import userRouter from "./User";
import authRouter from "./Auth";
import textSnippetRouter from "./TextSnippet";

apiRouter.use("/users", userRouter);
apiRouter.use("/users/auth", authRouter);
apiRouter.use("/text-snippets", textSnippetRouter);

export default apiRouter;
