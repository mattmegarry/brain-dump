"use strict";

import { User } from "../User/User.model";

import {
  passwordMatches,
  issueJWTForLocalStorage,
  issueJWTForCookie,
  cookieConfig
} from "../../utils/auth";

import Respond from "../../utils/responses";

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  // TO DO: SKIPPING INPUT VALIDATION - JUST PROTOTYPING!

  try {
    const user = await User.findOneByEmailIncludingPassword(email);
    if (user) {
      const { passwordDigest, emailVerified, ...userSafe } = user;
      const passwordIsCorrect = await passwordMatches(password, passwordDigest);

      if (!emailVerified) {
        res.locals = Respond.emailNeedsVerification();
        next();
      }

      if (user && passwordIsCorrect) {
        res.locals = Respond.success(userSafe);
        res.locals.data.token = await issueJWTForLocalStorage(userSafe.id);
        const cookie = await issueJWTForCookie(userSafe.id);
        res.cookie("auth", cookie, cookieConfig());
      } else {
        res.locals = Respond.loginRejected();
        next();
      }
    } else {
      res.locals = Respond.loginRejected();
      next();
    }
  } catch (err) {
    console.log(err);
    res.locals = Respond.opaqueError();
  }
  next();
};

export const signout = async (req, res, next) => {
  res.clearCookie("auth", cookieConfig());
  res.locals = Respond.success();
  next();
};
