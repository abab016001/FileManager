# 新增資料表 CREATE TABLE

## 1️⃣ 基本語法

```sql
CREATE TABLE [IF NOT EXISTS] table_name (
    column1_name column1_type [column1_constraints],
    column2_name column2_type [column2_constraints],
    ...
    [table_constraints]
);
```

- `IF NOT EXISTS`：如果表已存在，則不報錯。
- `column_type`：欄位資料型別（SQLite 型別不像其他 RDBMS 強制，但建議用）。
- `column_constraints`：欄位約束。
- `table_constraints`：表級約束，例如複合主鍵。

## 2️⃣ SQLite 支援的資料型別

SQLite 採 **動態型別（Type Affinity）**，常見型別：

| 型別      | 說明                                 |
| --------- | ------------------------------------ |
| `INTEGER` | 整數                                 |
| `REAL`    | 浮點數                               |
| `TEXT`    | 文字                                 |
| `BLOB`    | 二進位資料                           |
| `NUMERIC` | 可存 INTEGER、REAL、TEXT，依情況轉型 |

## 3️⃣ 欄位約束（Column Constraints）

```text
雖然 SQLite 允許任意順序，但一般建議：
PRIMARY KEY -> UNIQUE -> CHECK -> FOREIGN KEY
。PRIMARY KEY 通常是最重要的約束，先定義可以一眼看出主鍵。
。UNIQUE 放在主鍵之後，清楚表示唯一性約束。
。CHECK 條件通常與欄位值相關，放中間。
。FOREIGN KEY 放最後，因為依賴其他表，邏輯上排最後較清楚。
```

| 約束            | 說明                                                 |
| --------------- | ---------------------------------------------------- |
| `PRIMARY KEY`   | 主鍵，唯一且不可為 NULL。可與 `AUTOINCREMENT` 配合。 |
| `AUTOINCREMENT` | 讓 `INTEGER PRIMARY KEY` 自動加 1。                  |
| `NOT NULL`      | 不允許 NULL 值。                                     |
| `UNIQUE`        | 唯一值約束。                                         |
| `CHECK(expr)`   | 條件檢查，例如 `CHECK(age > 0)`。                    |
| `DEFAULT val`   | 預設值，例如 `DEFAULT 0`。                           |
| `COLLATE`       | 排序規則，例如 `COLLATE NOCASE`。                    |
| `REFERENCES`    | 外鍵參考，例如 `REFERENCES parent_table(id)`。       |

## 4️⃣ 表級約束（Table Constraints）

- 複合主鍵：

```sql
PRIMARY KEY (column1, column2)
```

- 外鍵：

```sql
FOREIGN KEY (column_name) REFERENCES parent_table(parent_column)
    [ON DELETE action] [ON UPDATE action]
```

- UNIQUE（複合唯一性）：

```sql
UNIQUE (column1, column2)
```

- CHECK：

```sql
CHECK (column1 > 0 AND column2 < 100)
```

- ON DELETE / ON UPDATE 支援：
  - CASCADE、SET NULL、SET DEFAULT、NO ACTION、RESTRICT

## 5️⃣ 範例：簡單表

```sql
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    age INTEGER DEFAULT 0 CHECK(age >= 0),
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

## 6️⃣ 範例：含複合主鍵與外鍵

```sql
CREATE TABLE orders (
    order_id INTEGER,
    user_id INTEGER,
    product_id INTEGER,
    quantity INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY(order_id, product_id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES products(id)
);
```

# CRUD 執行

## SQLite + Node.js (better-sqlite3)

| 操作                | SQL 範例                                       | 回傳資訊                  | 說明                                                     |
| ------------------- | ---------------------------------------------- | ------------------------- | -------------------------------------------------------- |
| **Create / Insert** | `INSERT INTO users (name,email) VALUES (?, ?)` | `info.lastInsertRowid`    | `lastInsertRowid` 是剛插入資料的自動遞增 ID。            |
| **Read / Select**   | `SELECT * FROM users WHERE id = ?`             | 查詢結果 (`row` / `rows`) | SELECT 不會改變資料庫，沒有 lastInsertRowid 或 changes。 |
| **Update**          | `UPDATE users SET name = ? WHERE id = ?`       | `info.changes`            | `changes` 表示有多少筆資料被更新，不會產生新的 ID。      |
| **Delete**          | `DELETE FROM users WHERE id = ?`               | `info.changes`            | `changes` 表示有多少筆資料被刪除，不會產生新的 ID。      |

### better-sqlite3 範例程式

```js
import Database from 'better-sqlite3'

// 建立資料庫
const db = new Database('mydb.sqlite3')

// 建立資料表
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE
  )
`
).run()

console.log('資料表建立完成')

// ---------------- Insert ----------------
let info = db
  .prepare(
    `
  INSERT INTO users (name, email) VALUES ($name, $email)
`
  )
  .run({ $name: 'Alice', $email: 'alice@example.com' })
console.log('新增資料完成，最新 ID:', info.lastInsertRowid)

info = db
  .prepare(
    `
  INSERT INTO users (name, email) VALUES ($name, $email)
`
  )
  .run({ $name: 'Bob', $email: 'bob@example.com' })
console.log('新增資料完成，最新 ID:', info.lastInsertRowid)

// ---------------- Select ----------------
const user1 = db.prepare('SELECT * FROM users WHERE id = $id').get({ $id: 1 })
console.log('查詢單筆:', user1)

const allUsers = db.prepare('SELECT * FROM users').all()
console.log('查詢所有:', allUsers)

// ---------------- Update ----------------
info = db
  .prepare('UPDATE users SET name = $name WHERE id = $id')
  .run({ $name: 'Alice Chang', $id: 1 })
console.log('更新完成，影響列數:', info.changes)

// ---------------- Delete ----------------
info = db.prepare('DELETE FROM users WHERE id = $id').run({ $id: 2 })
console.log('刪除完成，影響列數:', info.changes)

// ---------------- 最終結果 ----------------
const finalUsers = db.prepare('SELECT * FROM users').all()
console.log('最終資料:', finalUsers)

// 關閉資料庫
db.close()
```

### ✅ 特點：

- `run()` 會回傳 info 物件，包含 `.changes` 與 `.lastInsertRowid`
- `get()` 取單筆資料{key:value} ；查無資料回傳 undefined
- `all()` 取多筆資料[{key:value}] ；查無資料回傳[]

### ✅ 說明：

1. `$` 開頭的名稱是 **命名參數**

- 也可以用 `:name` 或 `@name`，效果一樣

2. `.run({ $name: ..., $id: ... })` 直接傳入物件，對應 SQL 中的命名參數
3. Insert 仍然可以透過 `info.lastInsertRowid` 拿到最新 ID
4. Update / Delete 用 `info.changes` 拿到影響列數
