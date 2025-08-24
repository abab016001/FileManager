import { Util } from "./util.js";
import { ServiceUtil as service } from '@/service/utilService.js';
const validate = ({ name, path }) => {
  if (Util.isEmpty(name)) {
    return "請輸入標籤名稱";
  }
  if (Util.isEmpty(path)) {
    return "請輸入標籤路徑";
  }
  return false;
}

/**
 * @returns jsonObj: { result: { data, msg } }
 */
const processTagAddSave = async ({ name, path }) => {
  const result = await service.POST({
    url: `${service.resourceRoot}/processTagAddSave`,
    paramObj: { "NAME": name, "PATH": path }
  });
  return result;
};

/**
 * @returns jsonObj: { result: { data, msg } }
 */
const processQueryTags = async () => {
  const result = await service.POST({
    url: `${service.resourceRoot}/processQueryTags`,
    paramObj: {}
  });
  return result;
}

export const Fn = {
  validate,
  processQueryTags,
  processTagAddSave
}