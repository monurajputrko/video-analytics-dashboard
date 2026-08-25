import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import database from "../config/database.js";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const schema = fs.readFileSync(
  path.join(currentDirectory, "schema.sql"),
  "utf8",
);

database.exec(schema);
console.log("Database migration complete.");
database.close();
