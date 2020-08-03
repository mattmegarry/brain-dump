"use strict";

import { User } from "./User.model";
import { hashSaltPassword } from "../../utils/auth";
import Respond from "../../utils/responses";

export const createUser = async (req, res, next) => {
  const { email, password } = req.body;
  // TO DO: SKIPPING INPUT VALIDATION - JUST PROTOTYPING!

  try {
    const passwordDigest = await hashSaltPassword(password);
    await User.create(email, passwordDigest);
    res.locals.data = Respond.emailNeedsVerification();
  } catch (err) {
    console.log(err);
    res.locals = Respond.opaqueError();
  }
  next();
};
