const isEmpty = (obj) => {
  if (!obj) return true;
  if (typeof obj == "string") {
    if (obj.trim() == "") return true;
  }
  return false;
}

const YYYMMDD = (timestamp) => {
  const yyy = timestamp.slice(0, 3);
  const mm = timestamp.slice(3, 5);
  const dd = timestamp.slice(5, 7);
  return `${yyy}年${mm}月${dd}日`;
}

export const Util = {
  isEmpty,
  YYYMMDD
}