"use strict";

import express from "express";
const collectionRouter = express.Router();

import send from "../../utils/send";
import { protect } from "../../utils/auth.js";
import { createCollection } from "./collection.controller.js";

collectionRouter.post("/create", protect, createCollection, send);

export default collectionRouter;
