"use strict";

import express from "express";
const apiRouter = express.Router();

import userRouter from "./User";
import authRouter from "./Auth";
import collectionRouter from "./Collection";
import snippetRouter from "./Snippet";

apiRouter.use("/users", userRouter);
apiRouter.use("/users/auth", authRouter);
apiRouter.use("/collections", collectionRouter);
apiRouter.use("/snippets", snippetRouter);

export default apiRouter;
