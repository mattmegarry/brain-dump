"use strict";

import db from "./index";
import asyncForEach from "../utils/asyncForEach";
import * as seedData from "./seedData.json";
import { User } from "../components/User/User.model";
import { Snippet } from "../components/Snippet/Snippet.model";
import { hashSaltPassword } from "../utils/auth";
import { Collection } from "../components/Collection/Collection.model";

const users = `CREATE TABLE IF NOT EXISTS
      users(
        user_id UUID PRIMARY KEY,
        email VARCHAR(200) NOT NULL UNIQUE,
        password_digest VARCHAR(200) NOT NULL,
        email_verified BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
      )`;

const snippets = `CREATE TABLE IF NOT EXISTS
      snippets(
        snippet_id UUID PRIMARY KEY,
        snippet_text VARCHAR(2000) NOT NULL,
        user_id UUID NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE, 
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
      )`;

const collections = `CREATE TABLE IF NOT EXISTS
      collections(
        collection_id UUID PRIMARY KEY,
        collection_name VARCHAR(120) NOT NULL,
        collection_type VARCHAR (20),
        user_id UUID NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE, 
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
      )`;

const collectionsSnippets = `CREATE TABLE IF NOT EXISTS
      collections_snippets (
        CONSTRAINT snippets_collections_pkey PRIMARY KEY (collection_id, snippet_id),
        collection_id UUID,
        snippet_id UUID,
        created_at TIMESTAMP NOT NULL,
        FOREIGN KEY(collection_id) REFERENCES collections(collection_id) ON UPDATE CASCADE,
        FOREIGN KEY(snippet_id) REFERENCES snippets(snippet_id) ON UPDATE CASCADE ON DELETE CASCADE
);
`;

const tableQueries = [users, snippets, collections, collectionsSnippets];
const tableNames = ["users", "snippets", "collections", "collections_snippets"];

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

async function seedUsersAndData() {
  try {
    await asyncForEach(seedData.users, async user => {
      const { email, password } = user;
      const passwordDigest = await hashSaltPassword(password);
      const createdUser = await User.create(email, passwordDigest);
      await asyncForEach(user.snippets, async snippet => {
        await Snippet.create(createdUser.userId, snippet.snippetText);
      });
      await asyncForEach(user.collections, async collection => {
        await Collection.create(createdUser.userId, collection.collectionName);
      });
      await asyncForEach(user.snippets, async snippet => {
        // snippet_text and collection_name will be unique in our development data, so the following is fine...
        // (Would be BAD in production...)
        const collectionRes = await db.queryReturningOne(
          `SELECT collection_id FROM collections WHERE collection_name=$1`,
          [snippet.collectionName]
        );
        const snippetRes = await db.queryReturningOne(
          `SELECT snippet_id FROM snippets WHERE snippet_text=$1`,
          [snippet.snippetText]
        );
        // Our seed data had some cases of snippets that do not have a collection...
        if (collectionRes) {
          await Collection.linkSnippet(
            collectionRes.collectionId,
            snippetRes.snippetId
          );
        }
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
  await seedUsersAndData();
  console.log("Done");
}

dropAndBuildTables();
