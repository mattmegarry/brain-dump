"use strict";

import Respond from "../../utils/responses";

export const createCollection = async (req, res, next) => {
  // TO DO: SKIPPING INPUT VALIDATION - JUST PROTOTYPING!
  const { collectionName, collectionType } = req.body;
  const userId = req.trustedUserId;

  try {
    await Collection.create(userId, collectionName, collectionType);
  } catch (err) {
    console.log(err);
    res.locals = Respond.opaqueError();
  }
  next();
};
