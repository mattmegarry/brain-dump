"use strict";

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import Respond from "./utils/responses";
import apiRouter from "./components/index";
import send from "./utils/send";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      exposedHeaders: ["x-auth-token"]
    })
  );
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", apiRouter);

app.use((req, res, next) => {
  res.locals = Respond.notFound();
  send(req, res);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.locals = Respond.opaqueError();
  send(req, res);
});

export default app;
