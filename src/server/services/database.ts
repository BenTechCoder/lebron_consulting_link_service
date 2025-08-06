/*
Service to interact and manage SQlite DB Cache
*/
import Database from 'better-sqlite3';
import { promises as fs } from 'fs';

const db = new Database('link_cache.db');
db.pragma('journal_mode = WAL');

export async function startCache() {
  const isDbCreated = () => {
    try {
        fs.access('link_cache.db');
        return true
    } catch {
        return false;
    }
  }
  if (isDbCreated() === false) {
    db.prepare(
      `
        CREATE TABLE links (id INTEGER PRIMARY KEY);
        `
    ).run();
  }
}

function syncWithWP(params: unknown) {
  // Function that reloads local SQlite Cache with WP-API request Payload
}

function addLinkToDB(params: unknown) {
  // Add individual Link to DB
}
