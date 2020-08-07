"use strict";

import { Snippet } from "./Snippet.model";
import Respond from "../../utils/responses";

export const getMany = async (req, res, next) => {
  const userId = req.trustedUserId;

  try {
    const snippets = await Snippet.getManyByUserId(userId);
    res.locals = Respond.success(snippets);
  } catch (err) {
    console.log(err);
    res.locals = Respond.opaqueError();
  }
  next();
};

export const createAndGetMany = async (req, res, next) => {
  const userId = req.trustedUserId;
  const { snippetText } = req.body;

  try {
    if (snippetText) {
      await Snippet.create(userId, snippetText);
    }
    const snippets = await Snippet.getManyByUserId(userId);
    res.locals = Respond.success(snippets);
  } catch (err) {
    console.log(err);
    res.locals = Respond.opaqueError();
  }
  next();
};

export const updateOne = async (req, res, next) => {
  const userId = req.trustedUserId;
  const { snippetId, newSnippetText } = req.body;
  console.log(req.body);

  try {
    if (newSnippetText) {
      await Snippet.update(snippetId, userId, newSnippetText);
    }
    const snippets = await Snippet.getManyByUserId(userId);
    res.locals = Respond.success(snippets);
  } catch (err) {
    console.log(err);
    res.locals = Respond.opaqueError();
  }
  next();
};

export const deleteOneAndGetMany = async (req, res, next) => {
  const userId = req.trustedUserId;
  const { snippetId } = req.body;

  try {
    if (snippetId) {
      await Snippet.deleteOne(snippetId, userId);
    }
    const snippets = await Snippet.getManyByUserId(userId);
    res.locals = Respond.success(snippets);
  } catch (err) {
    console.log(err);
    res.locals = Respond.opaqueError();
  }
  next();
};
