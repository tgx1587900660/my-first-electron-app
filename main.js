// 引入 控制app生命周期和创建本机浏览器窗口的 模块
const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, './preload.js')
    }
  })

  // 加载 index.html
  // win.loadFile('index.html')
  win.loadFile(path.join(__dirname, './src/app.html')) // 植入 井字棋 游戏

  // 打开开发工具
  // win.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化 和 创建浏览器窗口的时候调用 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
