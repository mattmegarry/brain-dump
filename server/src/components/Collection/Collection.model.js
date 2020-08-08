"use strict";

import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import db from "../../db";

const create = async (userId, collectionName, collectionType = "Default") => {
  const query = `INSERT into collections VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;

  const values = [
    uuidv4(),
    collectionName,
    collectionType,
    userId,
    moment(new Date()),
    moment(new Date())
  ];

  try {
    const collection = await db.queryReturningOne(query, values);
    return collection;
  } catch (err) {
    console.error(err);
  }
};

const linkSnippet = async (collectionId, snippetId) => {
  const query = `INSERT into collections_snippets VALUES($1, $2, $3) RETURNING *`;

  const values = [collectionId, snippetId, moment(new Date())];

  try {
    const collectionSnippet = await db.queryReturningOne(query, values);
    return collectionSnippet;
  } catch (err) {
    console.error(err);
  }
};

export const Collection = {
  create,
  linkSnippet
};
