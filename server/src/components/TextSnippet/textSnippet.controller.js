"use strict";

import { TextSnippet } from "./TextSnippet.model";
import Respond from "../../utils/responses";

export const getMany = async (req, res, next) => {
  const userId = req.trustedUserId;

  try {
    const textSnippets = await TextSnippet.getManyByUserId(userId);
    res.locals = Respond.success(textSnippets);
  } catch (err) {
    console.log(err);
    res.locals = Respond.opaqueError();
  }
  next();
};

export const createAndGetMany = async (req, res, next) => {
  const userId = req.trustedUserId;
  const { text } = req.body;

  try {
    if (text) {
      await TextSnippet.create(userId, text);
    }
    const textSnippets = await TextSnippet.getManyByUserId(userId);
    res.locals = Respond.success(textSnippets);
  } catch (err) {
    console.log(err);
    res.locals = Respond.opaqueError();
  }
  next();
};

export const updateOne = async (req, res, next) => {
  const userId = req.trustedUserId;
  const { id, newText } = req.body;

  try {
    if (newText) {
      await TextSnippet.update(id, userId, newText);
    }
    const textSnippets = await TextSnippet.getManyByUserId(userId);
    res.locals = Respond.success(textSnippets);
  } catch (err) {
    console.log(err);
    res.locals = Respond.opaqueError();
  }
  next();
};

export const deleteOneAndGetMany = async (req, res, next) => {
  const userId = req.trustedUserId;
  const { id } = req.body;

  try {
    if (id) {
      await TextSnippet.deleteOne(id, userId);
    }
    const textSnippets = await TextSnippet.getManyByUserId(userId);
    res.locals = Respond.success(textSnippets);
  } catch (err) {
    console.log(err);
    res.locals = Respond.opaqueError();
  }
  next();
};
