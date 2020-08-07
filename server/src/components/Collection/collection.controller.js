"use strict";

import Respond from "../../utils/responses";

export const createCollection = async (req, res, next) => {
  // TO DO: SKIPPING INPUT VALIDATION - JUST PROTOTYPING!
  const { collectionName } = req.body;
  const userId = req.trustedUserId;

  try {
    await Collection.create(collectionName, userId);
  } catch (err) {
    console.log(err);
    res.locals = Respond.opaqueError();
  }
  next();
};
