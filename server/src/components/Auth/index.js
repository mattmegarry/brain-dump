"use strict";

import express from "express";
const userRouter = express.Router();

import { login, signout } from "./auth.controller.js";

import send from "../../utils/send";

userRouter.post("/login", login, send);
userRouter.post("/signout", signout, send);

export default userRouter;
