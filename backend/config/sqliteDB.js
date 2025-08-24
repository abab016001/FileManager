console.log("sqliteDB.js 已載入");
import { parser as DDL_PARSER } from "./ddlParser.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const ddl = require('./ddl.json');
// import ddl from './ddl.json' assert { type: "json" };
import Database from "better-sqlite3";

let db = null;
let _dbpath = '../data/fileManager.sqlite3';
_dbpath = ':memory:'; // 暫存資料庫 (記憶體模式)

const dbConnection = () => {
  console.log("Init-dbConnection");
  try {
    db = new Database(_dbpath);
    console.log("成功連線到 SQLite 資料庫");
    return true;
  } catch (err) {
    console.error("資料庫連線失敗:", err.message);
    console.log("資料庫連線失敗:", err.message);
    return false;
  }
};

const createTable = () => {
  const parser = DDL_PARSER.sqlite(ddl);
  const { tableList } = parser;
  for (const table of tableList) {
    db.prepare(table).run();
  }
}

const queryTables = () => {
  const tables = db.prepare(`SELECT name FROM sqlite_master WHERE type='table'`).all();
  console.log("目前資料表清單", tables);
}

const Init = () => {
  const con = dbConnection();
  console.log("Init-con", con);
  if (con) {
    createTable();
    queryTables();
    console.log("Init-db", db);
    return db;
  } else {
    console.log("Init-null", db);
    return null;
  }
}

export default { Init }

dbConnection()