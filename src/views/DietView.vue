<template>
  <section class="container border border-secondary rounded py-3 mb-4">
    <p class="fs-5 mb-2">主食營養計算</p>
    <p class="fs-6 text-primary mb-3">
      依據上表求得的每日總熱量與飲水量，推算「乾濕食混合」方式的建議餵食量，以達每日總熱量與飲水量標準。
    </p>
    <div class="mb-3">
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="inlineCheckbox1"
          value="option1"
          disabled
        />
        <label class="form-check-label" for="inlineCheckbox1">主食罐</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="inlineCheckbox2"
          value="option2"
          disabled
        />
        <label class="form-check-label" for="inlineCheckbox2">乾飼料</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="inlineCheckbox3"
          value="option3"
          checked
          disabled
        />
        <label class="form-check-label" for="inlineCheckbox3">乾濕食混合</label>
      </div>
    </div>
    <form class="row mb-3">
      <div class="col col-lg-3">
        <div class="form-floating">
          <input
            type="number"
            class="form-control"
            :class="{ 'is-invalid': dryFoodPVlid, 'is-valid': !dryFoodPVlid }"
            id="floatingInput1"
            v-model="dryFoodP"
            @change="changeDryFoodP"
          />
          <label for="floatingInput1" class="text-danger">乾糧餵食比例(%)*</label>
        </div>
      </div>
      <div class="col col-lg-3">
        <div class="form-floating">
          <input
            type="number"
            class="form-control"
            id="floatingInput2"
            v-model="cannedFoodP"
            disabled
            readonly
          />
          <label for="floatingInput2">濕食餵食比例(%)*</label>
        </div>
      </div>
    </form>
    <form class="row mb-3">
      <p class="mb-2">乾糧營養資訊</p>
      <div class="col-lg-6 mb-3 mb-lg-0">
        <select
          class="form-select"
          :class="{ 'is-invalid': selectDryFoodVlid, 'is-valid': !selectDryFoodVlid }"
          aria-label="Default select example"
          v-model="selectDryFood"
          @change="selectDryName"
        >
          <option value="" disabled selected>請選擇乾糧</option>
          <option v-for="item in initDryData" :key="item.品牌" :value="item.品牌">
            {{ `${item.品牌} - ${item.類別} - ${item.口味}` }}
          </option>
        </select>
      </div>
      <div class="col-6 col-lg mb-3 mb-lg-0">
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="floatingInput3"
            v-model="unitOfDry"
            disabled
            readonly
          />
          <label for="floatingInput3">乾糧每日所需克數</label>
        </div>
        <span class="text-danger"
          >可提供的熱量(kcal)：{{ minNeedDryKcal + '~' + maxNeedDryKcal }}</span
        >
      </div>
      <div class="col-6 col-lg">
        <div class="form-floating mb-3 mb-lg-0">
          <input
            type="text"
            class="form-control"
            id="floatingInput4"
            v-model="unitOfWater"
            disabled
            readonly
          />
          <label for="floatingInput4">乾糧可提供的水份(ml)</label>
        </div>
      </div>
    </form>
    <form class="row">
      <p class="mb-2">尚缺的濕食營養資訊</p>
      <div class="col-6 col-lg-3">
        <div class="form-floating mb-3 mb-lg-0">
          <input
            type="text"
            class="form-control"
            id="floatingInput5"
            v-model="lackKcal"
            disabled
            readonly
          />
          <label for="floatingInput5">需補充的熱量/代謝能(kcal)</label>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="form-floating mb-3 mb-lg-0">
          <input
            type="text"
            class="form-control"
            id="floatingInput6"
            v-model="lackWater"
            disabled
            readonly
          />
          <label for="floatingInput6">建議的補水量(ml)</label>
        </div>
      </div>
    </form>
  </section>
  <div class="diet d-flex">
    <img
      src="../assets/img/305ED4FF-4462-4DAC-AE57-8925A8BA2F34_preview_rev_1.png"
      alt="羊羊的圖片2"
      class="img-fluid"
    />
    <div class="speech-bubble d-flex justify-content-center align-items-center">
      <p>需要調整餵食量嗎?</p>
    </div>
  </div>
  <section class="container py-3 mb-4">
    <p class="fs-5 mb-2">調整後的主食營養</p>
    <p class="fs-6 text-primary mb-3">
      乾糧餵食使用自動餵食器，機器出糧以10克為單位，故需調整"主食營養計算"的乾糧建議克數，並重新計算尚缺的濕食營養資訊。
    </p>
    <form class="row mb-3">
      <div class="col-6 col-lg-3 mb-3 mb-lg-0">
        <div class="form-floating">
          <input
            type="number"
            class="form-control"
            id="floatingInput7"
            v-model="modifyDryG"
            @change="changeModifyDry"
          />
          <label for="floatingInput7" class="text-danger">每日乾糧克數*</label>
        </div>
        <span class="text-danger">可提供的熱量(kcal)：{{ modifyNeedDryKcal }}</span>
      </div>
      <div class="col-6 col-lg-3">
        <div class="form-floating mb-3 mb-lg-0">
          <input
            type="text"
            class="form-control"
            id="floatingInput8"
            v-model="modifyUnitOfWater"
            disabled
            readonly
          />
          <label for="floatingInput8">乾糧可提供的水份(ml)</label>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="form-floating mb-3 mb-lg-0">
          <input
            type="text"
            class="form-control"
            id="floatingInput9"
            v-model="modifyLackKcal"
            disabled
            readonly
          />
          <label for="floatingInput9">需補充的熱量/代謝能(kcal)</label>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="form-floating mb-3 mb-lg-0">
          <input
            type="text"
            class="form-control"
            id="floatingInput10"
            v-model="modifyLackWater"
            disabled
            readonly
          />
          <label for="floatingInput10">建議的補水量(ml)</label>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import * as XLSX from 'xlsx'
import axios from 'axios'

import { mapState } from 'pinia'
// 定義好的 store 賦值給變數 useCatsCountStore
// 在元件中引入並呼叫 useCatsCountStore() 來訪問 store
import { useCatsCountStore } from '../components/CatsDataStore.js'

export default {
  data() {
    return {
      // 驗證必填欄位
      dryFoodPVlid: true,
      selectDryFoodVlid: true,
      // 乾糧濕食餵食比例
      dryFoodP: 0,
      cannedFoodP: 0,
      // 使用者選的項目值，做為篩選條件去取得EXCEL資料
      selectDryFood: '',
      // EXCEL中乾糧的熱量與水份
      dryOfKcal: 0,
      dryOfWater: 0,
      // 算出的乾糧的營養值
      minNeedDryKcal: '',
      maxNeedDryKcal: '',
      unitOfDry: '',
      unitOfWater: '',
      // 尚缺的營養
      lackKcal: '',
      lackWater: '',
      // 調整後的乾糧與目標
      modifyDryG: 0,
      modifyNeedDryKcal: '',
      modifyUnitOfWater: '',
      modifyLackKcal: '',
      modifyLackWater: '',
      // 第一個工作頁籤的資料
      initDryData: []
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
          // 獲取第一個工作頁籤表名稱
          const sheetName = workbook.SheetNames[0]

          // 獲取第一個工作頁籤表
          const mainWorksheet = workbook.Sheets[sheetName]

          // 將該工作頁籤表的 Excel 資料轉換為 JSON 格式
          const jsonData = XLSX.utils.sheet_to_json(mainWorksheet)
          this.initDryData = jsonData
          // console.log(jsonData)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    },
    // 濕食餵食比例
    changeDryFoodP() {
      if (this.dryFoodP !== null && this.dryFoodP !== 0 && this.dryFoodP !== '') {
        this.dryFoodPVlid = false
        this.cannedFoodP = 100 - this.dryFoodP
      } else {
        this.dryFoodPVlid = true
        this.cannedFoodP = ''
      }
    },
    selectDryName() {
      if (
        (this.dryFoodP == null || this.dryFoodP === 0 || this.dryFoodP === '') &&
        (this.cannedFoodP === 0 || this.cannedFoodP === '')
      ) {
        alert('請填寫乾濕食餵食比例!')
        this.selectDryFood = ''
      } else {
        this.selectDryFoodVlid = false
        if (
          this.inputCount.minKcal == null ||
          this.inputCount.minKcal === 0 ||
          this.inputCount.minKcal === ''
        ) {
          alert('請確實填寫「每日建議餵食與飲水量」的必填欄位!')
        } else {
          let selectDryData = {}
          // kcal
          let minNeedDryKcal = 0
          let maxNeedDryKcal = 0
          let minNeedDryG = 0
          let maxNeedDryG = 0
          // water
          let minNeedDryWater = 0
          let maxNeedDryWater = 0
          selectDryData = this.initDryData.filter((row) => row['品牌'] === this.selectDryFood)
          // console.log(selectDryData)

          this.dryOfKcal = selectDryData[0]['熱量(代謝能量)(kcal/kg)']
          this.dryOfWater = selectDryData[0]['水分(%)']
          // console.log(this.dryOfWater)

          // 目標熱量去計算建議的乾糧克數
          // kcal=(最低目標總熱量*乾糧餵食比例)/(每公克的乾糧熱量)
          minNeedDryKcal = (this.inputCount.minKcal * (this.dryFoodP / 100)).toFixed(1)
          this.minNeedDryKcal = minNeedDryKcal

          minNeedDryG = (minNeedDryKcal / (this.dryOfKcal / 1000)).toFixed(1)

          // (最高目標總熱量*乾糧餵食比例)/(每公克的乾糧熱量)
          maxNeedDryKcal = (this.inputCount.maxKcal * (this.dryFoodP / 100)).toFixed(1)
          this.maxNeedDryKcal = maxNeedDryKcal

          maxNeedDryG = (maxNeedDryKcal / (this.dryOfKcal / 1000)).toFixed(1)

          // water=(最低乾糧克數*乾糧水量)
          minNeedDryWater = (minNeedDryG * this.dryOfWater).toFixed(1)
          // =(最高乾糧克數*乾糧水量)
          maxNeedDryWater = (maxNeedDryG * this.dryOfWater).toFixed(1)

          // 乾糧建議克數下可提供的熱量、水量
          this.unitOfDry = minNeedDryG + '~' + maxNeedDryG
          this.unitOfWater = minNeedDryWater + '~' + maxNeedDryWater

          // addWater函式的參數，判斷結果寫到「主食營養計算」的尚缺的濕食營養資訊
          let waterParameter = 'select'

          this.addWater(
            minNeedDryKcal,
            maxNeedDryKcal,
            minNeedDryWater,
            maxNeedDryWater,
            waterParameter
          )
        }
        //
      }
    },
    changeModifyDry() {
      // 調整後每日乾糧克數回推能提供的熱量、水量
      // =調整後每日乾糧克數*每公克的乾糧熱量
      this.modifyNeedDryKcal = (this.modifyDryG * (this.dryOfKcal / 1000)).toFixed(1)
      // water=(調整後每日乾糧克數*乾糧水量)
      this.modifyUnitOfWater = (this.modifyDryG * this.dryOfWater).toFixed(1)

      // addWater函式的參數，判斷結果寫到「調整後營養計算」的需補充的熱量與水量
      let waterParameter = 'modify'

      this.addWater(
        this.modifyNeedDryKcal,
        this.modifyNeedDryKcal,
        this.modifyUnitOfWater,
        this.modifyUnitOfWater,
        waterParameter
      )
    },
    addWater(minNeedDryKcal, maxNeedDryKcal, minNeedDryWater, maxNeedDryWater, waterParameter) {
      // 尚缺的營養資訊
      // kcal
      let minLackDryKcal = 0
      let maxLackDryKcal = 0
      // water
      let minLackDryWater = 0
      let maxLackDryWater = 0

      minLackDryKcal = this.inputCount.minKcal - minNeedDryKcal
      maxLackDryKcal = this.inputCount.maxKcal - maxNeedDryKcal

      minLackDryWater = this.inputCount.minDrink - minNeedDryWater
      maxLackDryWater = this.inputCount.maxDrink - maxNeedDryWater

      if (waterParameter === 'select') {
        this.lackKcal = minLackDryKcal + '~' + maxLackDryKcal
        this.lackWater = minLackDryWater + '~' + maxLackDryWater
      } else {
        this.modifyLackKcal = minLackDryKcal + '~' + maxLackDryKcal
        this.modifyLackWater = minLackDryWater + '~' + maxLackDryWater
      }
    },
    initInput() {
      // 乾糧濕食餵食比例
      this.dryFoodP = 0
      this.cannedFoodP = 0
      // 使用者選的項目值，做為篩選條件去取得EXCEL資料
      this.selectDryFood = ''
      // 乾糧的營養值
      this.minNeedDryKcal = ''
      this.maxNeedDryKcal = ''
      this.unitOfDry = ''
      this.unitOfWater = ''
      // 尚缺的營養
      this.lackKcal = ''
      this.lackWater = ''
      // 調整後的乾糧與目標
      this.modifyDryG = 0
      this.modifyNeedDryKcal = ''
      this.modifyUnitOfWater = ''
      this.modifyLackKcal = ''
      this.modifyLackWater = ''

      // 執行驗證欄位
      if (this.dryFoodP == null || this.dryFoodP === 0 || this.dryFoodP === '') {
        this.dryFoodPVlid = true
      }
      if (this.selectDryFood === '') {
        this.selectDryFoodVlid = true
      }
    }
  },
  computed: {
    ...mapState(useCatsCountStore, {
      inputCount: (state) => state.inputCount
    })
  },
  watch: {
    'inputCount.catKcal': function () {
      this.initInput()
    }
  }
}
</script>
