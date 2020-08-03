"use strict";

import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import db from "../../db";

const create = async (userId, text) => {
  const query = `INSERT into text_snippets VALUES($1, $2, $3, $4, $5) RETURNING *`;

  const values = [
    uuidv4(),
    text,
    userId,
    moment(new Date()),
    moment(new Date())
  ];

  try {
    const textSnippet = await db.queryReturningOne(query, values);
    return textSnippet;
  } catch (err) {
    console.error(err);
  }
};

const getManyByUserId = async userId => {
  const query = `SELECT * FROM text_snippets WHERE user_id = $1 ORDER BY created_at DESC`;

  const values = [userId];

  try {
    const textSnippets = await db.queryReturningMany(query, values);
    return textSnippets;
  } catch (err) {
    console.error(err);
  }
};

const update = async (id, userId, text) => {
  const query = `
  UPDATE text_snippets SET text = $1, updated_at = $2 WHERE id = $3 AND user_id = $4 RETURNING *
  `;

  const values = [text, moment(new Date()), id, userId];

  try {
    const textSnippet = await db.queryReturningOne(query, values);
    return textSnippet;
  } catch (err) {
    console.error(err);
  }
};

const deleteOne = async (id, userId) => {
  const query = `
  DELETE FROM text_snippets WHERE id = $1 AND user_id = $2 RETURNING *
  `;

  const values = [id, userId];

  try {
    const deletedtextSnippet = await db.queryReturningOne(query, values);
    return deletedtextSnippet;
  } catch (err) {
    console.error(err);
  }
};

export const TextSnippet = {
  create,
  getManyByUserId,
  update,
  deleteOne
};
