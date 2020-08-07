"use strict";

import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import db from "../../db";

const create = async (userId, snippetText) => {
  const query = `INSERT into snippets VALUES($1, $2, $3, $4, $5) RETURNING *`;

  const values = [
    uuidv4(),
    snippetText,
    userId,
    moment(new Date()),
    moment(new Date())
  ];

  try {
    const snippet = await db.queryReturningOne(query, values);
    return snippet;
  } catch (err) {
    console.error(err);
  }
};

const getManyByUserId = async userId => {
  const query = `SELECT * FROM snippets WHERE user_id = $1 ORDER BY created_at DESC`;

  const values = [userId];

  try {
    const snippets = await db.queryReturningMany(query, values);
    return snippets;
  } catch (err) {
    console.error(err);
  }
};

const update = async (snippetId, userId, snippetText) => {
  const query = `
  UPDATE snippets SET snippet_text = $1, updated_at = $2 WHERE snippet_id = $3 AND user_id = $4 RETURNING *
  `;

  const values = [snippetText, moment(new Date()), snippetId, userId];

  try {
    const snippet = await db.queryReturningOne(query, values);
    return snippet;
  } catch (err) {
    console.error(err);
  }
};

const deleteOne = async (snippetId, userId) => {
  const query = `
  DELETE FROM snippets WHERE snippet_id = $1 AND user_id = $2 RETURNING *
  `;

  const values = [snippetId, userId];

  try {
    const deletedSnippet = await db.queryReturningOne(query, values);
    return deletedSnippet;
  } catch (err) {
    console.error(err);
  }
};

export const Snippet = {
  create,
  getManyByUserId,
  update,
  deleteOne
};
