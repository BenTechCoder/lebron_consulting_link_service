/*
Service to interact and manage SQlite DB Cache
*/
import Database from 'better-sqlite3';
import { promises as fs } from 'fs';

const db = new Database('link_cache.db');
db.pragma('journal_mode = WAL');

export function startCache() {
  const isDbCreated = (): boolean => {
    try {
      fs.access('link_cache.db');
      // TODO: USE LOGGING Library
      console.log('Database not found - Creating cache');
      return true;
    } catch {
      console.log('Database Found - Cache Stable');
      return false;
    }
  };

  if (!isDbCreated()) {
    db.prepare(
      `
        CREATE TABLE links (id INTEGER PRIMARY KEY,
         name TEXT,
         redirect_url TEXT,
         created TEXT,
         last_modified TEXT);
        `,
    ).run();
  }
}

function syncWithWP(params: unknown) {
  // Function that reloads local SQlite Cache with WP-API request Payload
}

function addLinkToDB(params: unknown) {
  // Add individual Link to DB
}
