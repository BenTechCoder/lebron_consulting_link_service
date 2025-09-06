/*
Service to interact and manage SQlite DB Cache
*/
import { Link } from '@src/models/common/types/link.model';
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
        CREATE TABLE links (link_id INTEGER PRIMARY KEY AUTOINCREMENT,
        wp_id INTEGER,
         name TEXT,
         redirect_url TEXT,
         created TEXT,
         last_modified TEXT,
         shortened_url TEXT);
        `
    ).run();
  }
}

function syncWithWP(params: unknown) {
  // Function that reloads local SQlite Cache with WP-API request Payload
}

// SECURITY: Validate redirect URLs before storing to prevent open redirect
// vulnerabilities
function addLinkToDB(link: Link) {
  // Add individual Link to DB
  db.prepare(
    `
      INSERT INTO links (name, redirect_url, created, last_modified)
      VALUES (?, ?, ?, ?);
    `
  ).run(link.customSlug, link.redirectionUrl, link.created, link.lastModified);
}