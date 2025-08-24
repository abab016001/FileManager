import { DaoObject as db } from "../dao/daoObj.js";
import { dao } from "../dao/ResourceDao.js";

const processQueryTags = (paramObj) => {
  const rtnList = db.QueryList({ sql: dao.queryAllTag, param: paramObj });
  return rtnList;
};

const processQueryTagById = (paramObj) => {
  const rtnMap = db.QueryMap({ sql: dao.queryTagById, param: paramObj });
  return rtnMap;
}

const processTagAddSave = (paramObj) => {
  const rtn = db.Insert({ sql: dao.insertTag, param: paramObj })
  return rtn;
};

export const ResourceManager = {
  processQueryTags,
  processQueryTagById,
  processTagAddSave
}