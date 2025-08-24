const RocTimestamp = () => {
  const now = new Date();
  const minguoYear = now.getFullYear() - 1911;
  const pad = (num, size) => num.toString().padStart(size, "0");
  const formatted =
    pad(minguoYear, 3) +         // 民國年(至少3位數)
    pad(now.getMonth() + 1, 2) + // 月 (01-12)
    pad(now.getDate(), 2) +      // 日 (01-31)
    pad(now.getHours(), 2) +     // 時 (00-23)
    pad(now.getMinutes(), 2) +   // 分 (00-59)
    pad(now.getSeconds(), 2) +   // 秒 (00-59)
    pad(now.getMilliseconds(), 3); // 毫秒 (000-999)

  return formatted;
}
export const FMMUtil = {
  RocTimestamp
};