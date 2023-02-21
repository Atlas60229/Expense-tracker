# Expense-tracker
Node.js + express框架 + MongoDB資料闊 的試作品

## 內容:
* 可註冊帳號及用ＦＢ登入
* 可用類別篩選

## 執行環境
Node.js: v18.12.0 <br>
express: v4.18.2 <br>
MongoDB<br>



## 安裝:
1. 打開terminal並複製此專案 <br>
`git clone https://github.com/Atlas60229/Expense-tracker.git`

2. 開啟終端機(Terminal)，進入存放此專案的資料夾 <br>
`cd Expense-tracker`

3. 安裝 npm 套件 <br>
`npm install`

4. 安裝 nodemon 套件 <br>
`npm install -g nodemon`

5. 新增.env檔案並根據.env.example檔案內資訊設置環境變數：<br>
`MONGODB_URL=mongodb+srv://<account>:<password>@cluster0.<xxxxx>.mongodb.net/restaurantSet?retryWrites=true&w=majority`
`SESSION_SECRET=trackerSecret`
`FACEBOOK_APP_ID=SKIP`
`FACEBOOK_APP_SECRET=SKIP`
`FACEBOOK_callbackURL=http://localhost:3000/auth/facebook/callback`

6. 啟用前先用 Terminal 輸入以下指令建立種子資料，看見seed created!代表建立成功。
`npm run seed`
`seed created!`
`seed established`

7. 按ctrl + c 關閉後輸入以下指令啟動伺服器，執行 app.js 檔案<br>
`npm run dev` 或 `nodemon app.js`

8. 當 terminal 出現下列訊息表示，表示伺服器與資料庫已啟動並成功連結<br>
`success initiate Server`
`MongoDB connected!`

9. 開啟新網頁並在網址輸入http://localhost:3000/<br>

10. 關閉伺服器： ctrl + c <br>