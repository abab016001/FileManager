# 檔案管理大師 FileManagerMaster(FMM)

- 入口
  - 檔案起始點
  - 標籤歸檔
  - 歸檔建議
  - 備份 + 管控
- 資源

  - 標籤管理
    - 1. 新增: 標籤名稱、路徑 => 自動生成路徑
    - 2. 編輯: 路徑 => 自動生成新路徑、搬檔
    - 3. 刪除: 檔案是否保留?
    - 4. 查詢: 標籤樹狀，可進行分支標籤管理
  - 標籤搜尋
    - 自訂關鍵字
    - 關鍵字查詢

- 任務
- 封存 + 快速提取
- 路徑規劃建議
- 檔案重新命名工具
- spotlight

## WEB 架構

```
<Header>

<SideNav> 左邊功能樹
  <Entry> 入口進入點
  <Resource> 資源進入點
    <header>
      <root> | <search><add>
    </header>
    <main>
      <tagList>
        (checkbox)
        (tagName)
        (createDateTime)
        (updateDateTime)
        (edit-btn)
        <!-- (delete-btn) -->
      </tagList>
    </main>
  <Task> 任務進入點

<Main> 右邊工作區

<Footer>
```

## BACKEND 架構

## DB 架構

> TABLE-標籤主擋 = FMMT001
