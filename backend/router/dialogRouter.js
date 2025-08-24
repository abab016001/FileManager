import pkg from 'electron';
import express from 'express';
const { app, BrowserWindow, dialog } = pkg;
const router = express.Router();

let tempWin = null;

router.get('/select-folder', async (req, res) => {
  const result = await dialog.showOpenDialog(tempWin, {
    title: "請選擇資料夾",
    properties: ["openDirectory"]
  });

  if (result.canceled) {
    res.json({ canceled: true })
  } else {
    res.json({ canceled: false, folderPath: result.filePaths[0] })
  }
});

app.whenReady().then(() => {
  console.log('Electron app ready');

  tempWin = new BrowserWindow({
    width: 0,
    height: 0,
    show: true,      // 必須 show，否則對話框可能最小化
    skipTaskbar: true,　// 不要顯示在工具列
    focusable: false,      // 不攔截滑鼠事件
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });
  tempWin.setIgnoreMouseEvents(true);
});

export default router;