"use strict";

import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import db from "../../db";

const create = async (email, passwordHash) => {
  const query = `INSERT INTO
  users(id, email, password_digest, created_at, updated_at, email_verified)
  VALUES($1, $2, $3, $4, $5, $6)
  returning id`; // TO DO: EMAIL VERIFICATION FLOW - REMOVE email_verified and $6

  const values = [
    uuidv4(),
    email,
    passwordHash,
    moment(new Date()),
    moment(new Date()),
    true // TO DO: EMAIL VERIFIFICATION FLOW
  ];

  try {
    const user = await db.queryReturningOne(query, values);
    return user;
  } catch (err) {
    console.error(err);
  }
};

const findOneByEmailWithoutPassword = async email => {
  const query = `
  SELECT id, email, email_verified, created_at, updated_at FROM users WHERE email = $1
  `;

  const values = [email];
  try {
    const user = await db.queryReturningOne(query, values);
    return user;
  } catch (err) {
    console.error(err);
  }
};

const findOneByEmailIncludingPassword = async email => {
  const query = `
  SELECT * FROM users WHERE email = $1
  `;

  const values = [email];
  try {
    const user = await db.queryReturningOne(query, values);
    return user;
  } catch (err) {
    console.error(err);
  }
};

export const User = {
  create,
  findOneByEmailWithoutPassword,
  findOneByEmailIncludingPassword
};
