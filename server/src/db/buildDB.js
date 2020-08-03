"use strict";

import db from "./index";
import asyncForEach from "../utils/asyncForEach";
import * as seedData from "./seedData.json";
import { User } from "../components/User/User.model";
import { TextSnippet } from "../components/TextSnippet/TextSnippet.model";
import { hashSaltPassword } from "../utils/auth";

const users = `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        email VARCHAR(200) NOT NULL UNIQUE,
        password_digest VARCHAR(200) NOT NULL,
        email_verified BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
      )`;

const textSnippets = `CREATE TABLE IF NOT EXISTS
      text_snippets(
        id UUID PRIMARY KEY,
        text VARCHAR(2000) NOT NULL,
        user_id UUID NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, 
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
      )`;

const tableQueries = [users, textSnippets];
const tableNames = ["users", "text_snippets"];

async function createAllTables() {
  try {
    await asyncForEach(tableQueries, async queryText => {
      await db.queryReturningNone(queryText);
    });
    return true;
  } catch (err) {
    console.log(err);
  }
}

async function dropAllTables() {
  try {
    await asyncForEach(tableNames, async tableName => {
      await db.queryReturningNone(`DROP TABLE IF EXISTS ${tableName} CASCADE`, [
        tableName
      ]);
    });
    return true;
  } catch (err) {
    console.log(err);
  }
}

async function seedUsersAndtextSnippets() {
  try {
    await asyncForEach(seedData.users, async user => {
      const { email, password } = user;
      const passwordDigest = await hashSaltPassword(password);
      const createdUser = await User.create(email, passwordDigest);
      await asyncForEach(user.textSnippets, async textSnippet => {
        await TextSnippet.create(createdUser.id, textSnippet.text);
      });
    });
    return true;
  } catch (err) {
    console.log(err);
  }
}

async function dropAndBuildTables() {
  await dropAllTables();
  await createAllTables();
  await seedUsersAndtextSnippets();
  console.log("Done");
}

dropAndBuildTables();
