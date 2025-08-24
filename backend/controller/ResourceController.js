import { ResourceManager as manager } from "../manager/ResourceManager.js";

const processQueryTags = (req, res) => {
  const { body: paramObj } = req;
  const query = manager.processQueryTags(paramObj);
  res.json({ "result": query });
}

const processTagAddSave = (req, res) => {
  const { body: { NAME, PATH } } = req;
  const paramObj = { NAME, PATH };
  // 先查 tag 是否存在
  const query = manager.processQueryTagById(paramObj);
  if (query.data) {
    res.json({ "result": query });
    return;
  }

  // 新增 tag
  const insert = manager.processTagAddSave(paramObj);
  res.json({ "result": insert });
}

export const ResourceController = {
  processQueryTags,
  processTagAddSave
}