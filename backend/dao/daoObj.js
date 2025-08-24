import { FMMUtil as Util } from "../util/FMMUtil.js";
import DB from "../config/sqliteDB.js";
const db = DB.Init();
console.log({ db })

const QueryMap = ({ sql, param }) => {
  const rtn = { "data": "", "msg": "" };
  console.log("QueryMap", { sql, param });

  try {
    const info = db.prepare(sql).get(param);
    rtn.data = info;
    rtn.msg = info ? '取得查詢結果' : '查無資料';
  } catch (err) {
    rtn.data = null;
    rtn.msg = '查詢失敗:' + err.message;
  }

  return rtn;
};

const QueryList = ({ sql, param }) => {
  const rtn = { "data": "", "msg": "" };
  console.log("QueryList", { sql, param });

  try {
    const info = db.prepare(sql).all(param);
    rtn.data = info;
    rtn.msg = '取得查詢結果筆數:' + info.length;
  } catch (err) {
    rtn.data = null;
    rtn.msg = '查詢失敗:' + err.message;
  }

  return rtn;
};

const Insert = ({ sql, param }) => {
  const rtn = { "data": "", "msg": "" };
  param["CREATE_DATETIME"] = Util.RocTimestamp();
  param["UPDATE_DATETIME"] = Util.RocTimestamp();
  console.log("Insert", { sql, param });

  try {
    const info = db.prepare(sql).run(param);
    rtn.data = info.lastInsertRowid;
    rtn.msg = '新增資料完成，最新 ID:' + info.lastInsertRowid;
  } catch (err) {
    rtn.data = null;
    rtn.msg = '新增失敗:' + err.message;
  }

  return rtn;
};

const Update = ({ sql, param }) => {
  const rtn = { "data": "", "msg": "" };
  param["UPDATE_DATETIME"] = Util.RocTimestamp();
  console.log("Update", { sql, param });

  try {
    const info = db.prepare(sql).run(param);
    rtn.data = info.changes;
    rtn.msg = '更新完成，影響列數:' + info.changes;
  } catch (err) {
    rtn.data = null;
    rtn.msg = '更新失敗:' + err.message;
  }

  return rtn;
};

const Delete = ({ sql, param }) => {
  const rtn = { "data": "", "msg": "" };
  console.log("Delete", { sql, param });

  try {
    const info = db.prepare(sql).run(param);
    rtn.data = info.changes;
    rtn.msg = '刪除完成，影響列數:' + info.changes;
  } catch (err) {
    rtn.data = null;
    rtn.msg = '刪除失敗:' + err.message;
  }

  return rtn;
};

export const DaoObject = {
  QueryMap,
  QueryList,
  Insert,
  Update,
  Delete
}