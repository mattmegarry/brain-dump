"use strict";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Respond from "./responses";

export const hashSaltPassword = plaintextPassword => {
  return bcrypt.hash(plaintextPassword, 12);
};

export const passwordMatches = (plaintextPassword, passwordDigest) => {
  return bcrypt.compare(plaintextPassword, passwordDigest);
};

export const issueJWTForCookie = async userId => {
  let token = jwt.sign({ userId: userId }, process.env.JWT_COOKIE_SECRET, {
    expiresIn: "7h"
  });
  return token;
};

export const issueJWTForLocalStorage = async userId => {
  let token = jwt.sign(
    { userId: userId },
    process.env.JWT_LOCAL_STORAGE_SECRET,
    {
      expiresIn: "7h"
    }
  );
  return token;
};

export const cookieConfig = () => {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false
  };
};

export const localStorageJwtVerified = async req => {
  const authHeader = req.headers["authorization"];
  let decodedJwt;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  let token = authHeader.slice(7, authHeader.length).trim();

  if (token) {
    jwt.verify(token, process.env.JWT_LOCAL_STORAGE_SECRET, (err, decoded) => {
      if (err) {
        return false;
      } else {
        decodedJwt = decoded;
      }
    });
    return decodedJwt;
  } else {
    return false;
  }
};

export const cookieJwtVerified = async req => {
  let token = req.cookies.auth;
  let decodedJwt;

  if (token) {
    jwt.verify(token, process.env.JWT_COOKIE_SECRET, (err, decoded) => {
      if (err) {
        return false;
      } else {
        decodedJwt = decoded;
      }
    });
    return decodedJwt;
  } else {
    return false;
  }
};

const tokensMeetCriteria = (decodedCookieJwt, decodedLocalStorageJwt) => {
  console.log(decodedCookieJwt);
  console.log(decodedLocalStorageJwt);
  if (decodedCookieJwt.userId !== decodedLocalStorageJwt.userId) {
    return false;
  } else {
    return true;
  }
  // TO DO: BOTH TOKENS exp MUST NOT BE PAST DATE.NOW()!
};

export const protect = async (req, res, next) => {
  try {
    const decodedCookieJwt = await cookieJwtVerified(req);
    const decodedLocalStorageJwt = await localStorageJwtVerified(req);

    if (
      decodedCookieJwt &&
      decodedLocalStorageJwt &&
      tokensMeetCriteria(decodedCookieJwt, decodedLocalStorageJwt)
    ) {
      req.trustedUserId = decodedCookieJwt.userId;
      next();
    } else {
      Respond.accessDenied(req, res);
    }
  } catch (err) {
    console.log(err);
  }
};
