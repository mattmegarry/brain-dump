"use strict";

import express from "express";
const textSnippetRouter = express.Router();

import send from "../../utils/send";
import { protect } from "../../utils/auth";
import {
  createAndGetMany,
  getMany,
  updateOne,
  deleteOneAndGetMany
} from "./textSnippet.controller";

textSnippetRouter.post("/create", protect, createAndGetMany, send);
textSnippetRouter.get("/", protect, getMany, send);
textSnippetRouter.post("/update", protect, updateOne, send);
textSnippetRouter.post("/delete", protect, deleteOneAndGetMany, send);

export default textSnippetRouter;
