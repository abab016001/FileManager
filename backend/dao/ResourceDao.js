/** [取得]全部標籤 */
const queryAllTag = `
  SELECT * FROM FMMT001
`;

/** [取得]標籤 BY ID */
const queryTagById = `
SELECT * FROM FMMT001 
WHERE ID = $ID
`;

/** [新增]標籤 */
const insertTag = `
INSERT INTO FMMT001 (NAME, PATH, CREATE_DATETIME, UPDATE_DATETIME)
VALUES ($NAME, $PATH, $CREATE_DATETIME, $UPDATE_DATETIME)
`;

/** [異動]標籤名稱 BY ID */
const updateTagName = `
UPDATE FMMT001 
  SET NAME = $NAME, 
      UPDATE_DATETIME = $UPDATE_DATETIME
  WHERE ID = $ID
`;

/** [異動]標籤路徑 BY ID */
const updateTagPath = `
UPDATE FMMT001 
  SET PATH = $PATH 
      UPDATE_DATETIME = $UPDATE_DATETIME
  WHERE ID = $ID
`;

export const dao = {
  queryAllTag,
  queryTagById,
  insertTag,
  updateTagName,
  updateTagPath
}