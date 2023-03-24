const sqlite = require('better-sqlite3-with-prebuilds');
const db = new sqlite("./dream.db");
exports.db = db;