## 一、作品說明
從收容所領養了一隻兩個月大的小貓，取名羊羊。即使從未對自己的飲食卡路里留意，卻開始對羊羊的營養攝取格外留心，追踪和評估各種乾濕食的營養價值。羊羊的飲食是乾濕食混合，有固定的乾糧品牌，而濕食罐頭則經常更換。購買濕食(罐頭)時，會帶著 EXCEL 表單在商店內比對，現場計算每種罐頭是否符合羊羊每日建議的餵食量，使得購物過程既耗時、效率又低。

網路上貓咪熱量計算器，必填的乾濕食營養比例資訊過多，實際使用上頗為不便。況且只能計算一種濕食，無法滿足我對單一乾糧與多種濕食組合的需求。因此決定自行設計與開發一款貓咪營養計算器，透過更少的必填欄位，便能計算並滿足貓咪的營養需求。作品具響應式網頁特性，可供電腦與手機裝置的使用者瀏覽。

## 二、開發工具介紹
- 作業系統：Windows 11（64 bit）
- 開發工具：Visual Studio（版本 1.86.20）
- JavaScript 框架：Vue 3（Options API寫法）
  - 套件：axios、xlsx、DataTable、jquery
- Vue3 建構工具（預處理器）：Vite （ Node.js 版本 18.17.1）
  - 套件：pinia
- 切版框架：Bootstrap 5
  - CSS 預處理器：SCSS

## 三、專案資料夾架構
```
├── public                     # 包含專案程式的靜態資源，如 excel 檔案。
├── src                          # 專案的主要的開發檔案。
│   ├── assets/              # 包含應用程式的靜態資源，如圖像、字體等。
│            └── base/       # 定義常用的HTML元素初始設定。
│            └── img/        # 專案程式使用到的圖像。
│            └── pages/     # 專案程式的頁面檔案，對主頁或各分頁做樣式設定。
│            └── untils/     # 匯入其他scss檔案中的工具如變數、自行定義的字型樣式、間距。
│   ├── components/   # 專案程式中可重複使用元件或Pinia Store。
│   ├── router/             # 建立專案程式的路由表，讓系統能透過路徑去管控要執行哪個頁面裡的哪個元件。
│   ├── views/             # 專案程式的頁面元件，用於建立不同的頁面。
│   ├── App.vue          # 專案程式的主應用程式元件，也可以說是整個網頁的根元件。
│   ├── main.js            # 專案的程式進入點，所有檔案都需要跟main.js 有關連性才能被正確編譯。
├── index.html            # 專案程式的主要HTML文件，內容對應載入JavaScript的main.js檔案和渲染應用程式。
├── package.json        # 專案的npm套件管理檔案。
├── README.md      # 說明專案與運行的文件。
└── vite.config.js        # Vite的設定檔案，用於配置建置工具Vite的行為（包含專案編譯路徑設定）。
```

## 四、執行專案
```
npm install   #依照 vite 專案中 package.json 檔案內的項目進行安裝
npm run dev   #執行 vite 專案
```

## 五、數據資料來源
- 自行整理
  - 專案內的「貓咪愛用主食清單.xlsx」檔案

## 六、設計稿資訊
- 自行設計
