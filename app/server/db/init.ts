import { db } from "./index.js";
import { sql } from "drizzle-orm";

async function init() {
  console.log("Creating items table...");

  await db.run(
    sql`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        label TEXT NOT NULL,
        description TEXT NOT NULL,
        price REAL NOT NULL,
        image_path TEXT NOT NULL,
        sold INTEGER DEFAULT 0
      )
    `,
  );
  console.log("Creating settings table...");

  await db.run(
    sql`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contact_name TEXT,
        contact_phone TEXT,
        contact_email TEXT
      )
    `,
  );
  console.log("Table created successfully!");
}

init().catch(console.error);
