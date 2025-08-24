const sqlite = (ddl) => {
  const tableList = [];
  for (const table in ddl) {

    const cols = Object.entries(ddl[table].COLUMN).reduce((acc, cur) => {
      const [col, detail] = cur;

      const colDef = `
        ${col} ${detail.TYPE} 
        ${detail.PK ?? ""}
        ${detail.AUTO ?? ""}
        ${detail.NOTNULL ?? ""}
        ${detail.UNIQUE ?? ""}
      `.trim().replace(/\s+/g, ' '); // 去掉多餘空格換行;

      return acc ? acc + ", " + colDef : colDef;
    }, null);

    const sql = `CREATE TABLE IF NOT EXISTS ${table} (${cols})`;
    tableList.push(sql);
  }
  return { tableList };
}

export const parser = {
  sqlite
}