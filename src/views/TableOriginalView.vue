<!-- 使用bs5原生表格 -->
<template>
  <section class="container py-3 mb-4">
    <p class="fs-5 mb-2">濕食(罐頭)清單</p>
    <p class="text-primary mb-3">
      開封後罐頭需於1~2天內食用完畢，通常會依罐頭重量決定餐數與餵食量。下方濕食(罐頭)清單會依輸入的餵食量計算其可提供的營養。飼主可比對「調整後的主食營養」的尚缺部分，評估是否要調整乾濕食混合餵食計畫。
    </p>
    <div class="mb-3">
      <div class="form-check form-check-inline" @click="addWater">
        <input
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio1"
          value="option1"
          checked
        />
        <label class="form-check-label" for="inlineRadio1">濕食內加水</label>
      </div>
      <div class="form-check form-check-inline" @click="noAddWater">
        <input
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio2"
          value="option2"
        />
        <label class="form-check-label" for="inlineRadio2">濕食內不加水</label>
      </div>
    </div>
    <form class="row mb-3">
      <div class="col-6 col-lg-3">
        <div class="form-floating">
          <input
            type="number"
            class="form-control"
            id="floatingInput11"
            v-model="cannedG"
            @change="tableAdd"
          />
          <label for="floatingInput11" class="text-danger">每日濕食克數*</label>
        </div>
      </div>
      <div class="col-6 col-lg-3" v-if="isCannedWaterVisible">
        <div class="form-floating mb-3 mb-lg-0">
          <input
            type="number"
            class="form-control"
            id="floatingInput12"
            v-model="cannedWater"
            @change="tableAdd"
          />
          <label for="floatingInput12" class="text-danger">每日濕食內加水量(ml)*</label>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <button type="submit" class="btn btn-primary mb-3" @click="reformat">重新計算表格</button>
      </div>
    </form>
    <div class="row align-items-center mb-4 tableImgBlock">
      <div class="col-3">
        <img
          src="../assets/img/98B5B3B9-B01B-4355-B16F-981F19337445_preview_rev_1.png"
          alt="羊羊的圖片3"
          class="img-fluid mb-2"
        />
      </div>
      <div class="col">
        <p>
          <button
            class="btn btn-warning"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            顯示乾物比建議值
          </button>
        </p>
        <div class="collapse" id="collapseExample">
          <div class="card card-body">
            <ul>
              <li>粗蛋白：45%以上</li>
              <li>脂肪：25~45%</li>
              <li>碳水化合物：10%以下(越低越好)</li>
              <li class="mb-3">水份：63%以上</li>
              <li>註：下方清單中「推薦」欄位為購買指南。建議購買的優先順序為 ☆ > ○ > △ > X</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-bordered table-hover align-middle">
        <thead class="table-light">
          <tr class="align-bottom">
            <th scope="col" v-for="(item, key) in initCannedData[0]" :key="key">{{ key }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in initCannedData" :key="item.產地 + key">
            <td>{{ item.產地 }}</td>
            <td>{{ item.肉類源 }}</td>
            <td>{{ item.品牌 }}</td>
            <td>{{ item.系列 }}</td>
            <td>{{ item.口味 }}</td>
            <td>{{ item.推薦 }}</td>
            <td>{{ item['單位熱量/代謝能(kcal/100g)'].toFixed(1) }}</td>
            <td class="table-primary">{{ item['每日濕食熱量(kcal)'] }}</td>
            <td>{{ (item['水份(%)'] * 100).toFixed(2) }}%</td>
            <td class="table-primary">{{ item['每日濕食可提供的水份(ml)'] }}</td>
            <td class="table-primary">{{ item['含加水後的水份(ml)'] }}</td>
            <td>{{ (item['粗蛋白乾物比(%)'] * 100).toFixed(2) }}%</td>
            <td>{{ (item['脂肪乾物比(%)'] * 100).toFixed(2) }}%</td>
            <td>{{ (item['碳水化合物乾物比(%)'] * 100).toFixed(2) }}%</td>
            <td>{{ item.備註 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import * as XLSX from 'xlsx'
import axios from 'axios'

export default {
  data() {
    return {
      // 濕食乾糧與目標
      cannedG: 0,
      cannedWater: 0,
      // 是否顯示"濕食加水量"欄位
      isCannedWaterVisible: true,
      // 第二個工作頁籤的資料
      initCannedData: []
    }
  },
  mounted() {
    this.readExcelFile()
  },
  methods: {
    readExcelFile() {
      const vm = this // 使用參考保存 Vue 實例的上下文

      function fetchCatsData() {
        return new Promise((resolve, reject) => {
          // 讀取 Excel 檔案
          axios
            .get('/2023-catEatWhat/貓咪愛用主食清單.xlsx', {
              // Axios 將回應的數據視為二進制數據
              responseType: 'arraybuffer'
            })
            .then((response) => {
              const workbook = XLSX.read(response.data)
              vm.workbook = workbook
              resolve(workbook)
            })
            .catch((error) => {
              reject(error)
            })
        })
      }
      // 使用 Promise 的 then 和 catch 處理非同步操作
      fetchCatsData()
        .then((workbook) => {
          // 獲取第二個工作頁籤表名稱
          const sheetName = workbook.SheetNames[1]

          // 獲取第二個工作頁籤表
          const mainWorksheet = workbook.Sheets[sheetName]

          // 將該工作頁籤表的 Excel 資料轉換為 JSON 格式
          const jsonData = XLSX.utils.sheet_to_json(mainWorksheet)
          this.initCannedData = jsonData
          // console.log(jsonData)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    },
    // 不顯示"濕食加水量"欄位
    noAddWater() {
      this.isCannedWaterVisible = false
      this.cannedWater = 0
    },
    // 顯示"濕食加水量"欄位
    addWater() {
      this.isCannedWaterVisible = true
    },
    reformat() {
      event.preventDefault() // 禁止按鈕提交的默認行為

      // 使用 forEach 遍歷資料並新增計算欄位
      this.initCannedData.forEach((item) => {
        item['每日濕食熱量(kcal)'] = (
          (item['單位熱量/代謝能(kcal/100g)'] / 100) *
          this.cannedG
        ).toFixed(2)

        item['每日濕食可提供的水份(ml)'] = (item['水份(%)'] * this.cannedG).toFixed(2)

        item['含加水後的水份(ml)'] = (item['水份(%)'] * this.cannedG + this.cannedWater).toFixed(2)
      })
    }
  }
}
</script>
