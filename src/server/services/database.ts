/*
Service to interact and manage SQlite DB Cache
*/
import { base62Encode } from '@src/common/util/base62';
import { Link, LinkTable } from '@src/models/common/types/link.model';
import Database from 'better-sqlite3';
import { promises as fs, link } from 'fs';
import logger from 'jet-logger';

const db = new Database('link_cache.db');
db.pragma('journal_mode = WAL');

function startCache() {
  /*
  const isDbCreated = (): boolean => {
    // TODO: refactor to fs.open method
    try {
      fs.access('link_cache.db');
      // TODO: USE LOGGING Library
      return true;
    } catch {
      logger.info('Database Found - Cache Stable');
      return false;
    }
  };
  */
  /*
  if (!isDbCreated()) {
    
    db.prepare(
      `
        CREATE TABLE links (
        link_id INTEGER PRIMARY KEY AUTOINCREMENT,
        link_source TEXT NOT NULL,
        link_source_id INTEGER,
        redirect_url TEXT NOT NULL,
        custom_url_slug TEXT UNIQUE,
        encoded_url_slug TEXT UNIQUE,
        created_at TEXT,
        last_modified TEXT);
        `
    ).run();
    
    logger.info('Database not found - Creating cache');
  }
    */
}

/* 
TODO: SECURITY Validate redirect URLs before storing to prevent open redirect 
TODO: add proper error handling higher order function
 */
function insertLink(link: Link) {
  logger.info(link);
  // Add individual Link to DB
  const linkInsert = db
    .prepare(
      `
      INSERT INTO links (
      link_source,
      link_source_id,
      redirect_url,
      custom_url_slug,
      created_at,
      last_modified)
      VALUES (?, ?, ?, ?, ?, ?);
    `
    )
    .run(
      link.linkSource,
      link.linkSourceId,
      link.redirectUrl.toString(),
      link.customUrlSlug,
      link.createdAt.toUTCString(),
      link.lastModified.toUTCString()
    );

  db.prepare('UPDATE links SET encoded_url_slug = ? WHERE link_id = ?').run(
    base62Encode(String(linkInsert.lastInsertRowid)),
    linkInsert.lastInsertRowid
  );
}

function queryLinkByShortnedUrl(link: LinkTable) {
  // Add individual Link to DB
  const query = db
    .prepare(
      `
      Select redirect_url FROM links WHERE shortened_url = ?
      `
    )
    .run(link.encodedUrlSlug);

  return query;
}

function queryLinkByCustomUrl(link: Link) {
  // Add individual Link to DB
  const query = db
    .prepare(
      `
      Select redirect_url FROM links WHERE custom_url_slug = ?
      `
    )
    .run(link.customUrlSlug);

  return query;
}

export { startCache, insertLink, queryLinkByShortnedUrl, queryLinkByCustomUrl };
