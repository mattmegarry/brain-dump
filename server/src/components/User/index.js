"use strict";

import express from "express";
const userRouter = express.Router();

import { createUser } from "./user.controller.js";

import send from "../../utils/send";

userRouter.post("/create", createUser, send);

export default userRouter;
