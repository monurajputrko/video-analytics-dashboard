import Database from "better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const databasePath =
  process.env.DATABASE_PATH ||
  path.resolve(currentDirectory, "../db/database.sqlite");

const database = new Database(databasePath);
database.pragma("foreign_keys = ON");
database.pragma("journal_mode = WAL");

export default database;
