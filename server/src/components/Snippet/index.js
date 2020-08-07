"use strict";

import express from "express";
const snippetRouter = express.Router();

import send from "../../utils/send";
import { protect } from "../../utils/auth";
import {
  createAndGetMany,
  getMany,
  updateOne,
  deleteOneAndGetMany
} from "./snippet.controller";

snippetRouter.post("/create", protect, createAndGetMany, send);
snippetRouter.get("/", protect, getMany, send);
snippetRouter.post("/update", protect, updateOne, send);
snippetRouter.post("/delete", protect, deleteOneAndGetMany, send);

export default snippetRouter;
