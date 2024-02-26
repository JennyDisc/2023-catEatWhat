<template>
  <section class="mb-4">
    <div class="container">
      <form class="row border border-secondary rounded py-3">
        <p class="fs-5 mb-2">每日建議餵食與飲水量</p>
        <p class="fs-6 text-primary mb-3">計算結果是建議每日所需熱量與飲水量，僅供參考。</p>
        <div class="col-6 col-lg-3">
          <div class="form-floating mb-3 mb-lg-0">
            <select
              class="form-select"
              :class="{ 'is-invalid': catDerVlid, 'is-valid': !catDerVlid }"
              id="floatingDer"
              aria-label="Floating label select example"
              v-model="catDer"
              @change="changeKg"
            >
              <option value="" disabled selected>請選擇貓咪狀態</option>
              <option value="幼貓(未滿10個月且未結紮)">幼貓(未滿10個月且未結紮)</option>
              <option value="已結紮成貓">已結紮成貓</option>
              <option value="未結紮成貓">未結紮成貓</option>
              <option value="不活耀/肥胖成貓">不活耀/肥胖成貓</option>
              <option value="過瘦成貓">過瘦成貓</option>
              <option value="中年成貓(7~11歲)">中年成貓(7~11歲)</option>
              <option value="熟齡成貓(11歲以上)">熟齡成貓(11歲以上)</option>
              <option value="懷孕中母貓">懷孕中母貓</option>
              <option value="哺乳中母貓">哺乳中母貓</option>
            </select>
            <label for="floatingDer" class="text-danger">貓咪狀態(DER)*</label>
          </div>
        </div>
        <div class="col-6 col-lg-3" v-if="!isIdealKgVisible">
          <div class="form-floating mb-3 mb-lg-0">
            <input
              type="number"
              class="form-control"
              :class="{ 'is-invalid': catKgVlid, 'is-valid': !catKgVlid }"
              id="floatingKg"
              v-model="catKg"
              @change="sugKcal"
            />
            <label for="floatingKg" class="text-danger">貓咪體重(kg)*</label>
          </div>
        </div>
        <div class="col-6 col-lg-3" v-else>
          <div class="form-floating mb-3 mb-lg-0">
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': catIdealKgVlid, 'is-valid': !catIdealKgVlid }"
              id="floatingIdealKg"
              v-model="catIdealKg"
              @change="sugKcal"
            />
            <label for="floatingIdealKg" class="text-danger">目標體重(kg)*</label>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="form-floating mb-3 mb-lg-0">
            <input
              type="text"
              class="form-control"
              id="floatingKcal"
              v-model="catKcal"
              disabled
              readonly
            />
            <label for="floatingKcal">每日所需總熱量/代謝能(kcal)</label>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="form-floating mb-3 mb-lg-0">
            <input
              type="text"
              class="form-control"
              id="floatingWater"
              v-model="catWater"
              disabled
              readonly
            />
            <label for="floatingWater">建議每日飲水量(ml)</label>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
// 定義好的 store 賦值給變數 useCatsCountStore
// 在元件中引入並呼叫 useCatsCountStore() 來訪問 store
import { useCatsCountStore } from '../components/CatsDataStore.js'

export default {
  data() {
    return {
      // 驗證必填欄位
      catDerVlid: true,
      catKgVlid: true,
      catIdealKgVlid: true,
      // 貓咪狀態
      catDer: '',
      catKg: 0,
      catIdealKg: 0,
      // 目標餵量
      catKcal: '',
      catWater: '',
      minKcal: 0,
      maxKcal: 0,
      minDrink: 0,
      maxDrink: 0,
      // 切換體重欄位
      isIdealKgVisible: false
    }
  },
  methods: {
    changeKg() {
      // 驗證欄位
      if (this.catDer !== '') {
        this.catDerVlid = false
      }

      if (this.catDer === '不活耀/肥胖成貓' || this.catDer === '過瘦成貓') {
        this.isIdealKgVisible = true
        // 驗證欄位的參數恢復預設值
        this.catKgVlid = true
        this.catIdealKgVlid = true
      } else {
        this.isIdealKgVisible = false
        // 驗證欄位參數恢復預設
        this.catKgVlid = true
        this.catIdealKgVlid = true
      }
      // 變更下拉欄位值時，其餘欄位重置成預設
      this.catKg = 0
      this.catIdealKg = 0
      this.catKcal = ''
      this.catWater = ''
    },
    sugKcal() {
      // 驗證欄位
      if (this.catKg !== null && this.catKg !== 0 && this.catKg !== '') {
        this.catKgVlid = false
      } else {
        this.catKgVlid = true
      }
      if (this.catIdealKg !== null && this.catIdealKg !== 0 && this.catIdealKg !== '') {
        this.catIdealKgVlid = false
      } else {
        this.catIdealKgVlid = true
      }

      if (
        (this.catKg == null || this.catKg === 0 || this.catKg === '') &&
        (this.catIdealKg == null || this.catIdealKg === 0 || this.catIdealKg === '')
      ) {
        alert('請填寫貓咪體重才能運算!')
      } else {
        if (this.catDer == '幼貓(未滿10個月且未結紮)') {
          this.minKcal = parseInt((70 * this.catKg ** 0.75 * 2.5).toFixed(0))
          this.catKcal = this.minKcal + '~'
        } else if (this.catDer === '已結紮成貓') {
          this.minKcal = parseInt((70 * this.catKg ** 0.75 * 1.2).toFixed(0))
          this.maxKcal = parseInt((70 * this.catKg ** 0.75 * 1.4).toFixed(0))
          this.catKcal = this.minKcal + '~' + this.maxKcal
        } else if (this.catDer === '未結紮成貓') {
          this.minKcal = parseInt((70 * this.catKg ** 0.75 * 1.4).toFixed(0))
          this.maxKcal = parseInt((70 * this.catKg ** 0.75 * 1.6).toFixed(0))
          this.catKcal = this.minKcal + '~' + this.maxKcal
        } else if (this.catDer === '不活耀/肥胖成貓') {
          this.minKcal = parseInt((70 * this.catIdealKg ** 0.75 * 0.8).toFixed(0))
          this.maxKcal = parseInt((70 * this.catIdealKg ** 0.75 * 1).toFixed(0))
          this.catKcal = this.minKcal + '~' + this.maxKcal
        } else if (this.catDer === '過瘦成貓') {
          this.minKcal = parseInt((70 * this.catIdealKg ** 0.75 * 1.2).toFixed(0))
          this.maxKcal = parseInt((70 * this.catIdealKg ** 0.75 * 1.8).toFixed(0))
          this.catKcal = this.minKcal + '~' + this.maxKcal
        } else if (this.catDer === '中年成貓(7~11歲)') {
          this.minKcal = parseInt((70 * this.catKg ** 0.75 * 1.1).toFixed(0))
          this.maxKcal = parseInt((70 * this.catKg ** 0.75 * 1.4).toFixed(0))
          this.catKcal = this.minKcal + '~' + this.maxKcal
        } else if (this.catDer === '熟齡成貓(11歲以上)') {
          this.minKcal = parseInt((70 * this.catKg ** 0.75 * 1.1).toFixed(0))
          this.maxKcal = parseInt((70 * this.catKg ** 0.75 * 1.6).toFixed(0))
          this.catKcal = this.minKcal + '~' + this.maxKcal
        } else if (this.catDer === '懷孕中母貓') {
          this.minKcal = parseInt((70 * this.catKg ** 0.75 * 1.6).toFixed(0))
          this.maxKcal = parseInt((70 * this.catKg ** 0.75 * 2).toFixed(0))
          this.catKcal = this.minKcal + '~' + this.maxKcal
        } else if (this.catDer === '哺乳中母貓') {
          this.minKcal = parseInt((70 * this.catKg ** 0.75 * 2).toFixed(0))
          this.catKcal = this.minKcal + '~'
        } else {
          alert('請選擇貓咪狀態!')
        }
        this.sugWater()
      }
    },
    sugWater() {
      if (this.catDer === '不活耀/肥胖成貓' || this.catDer === '過瘦成貓') {
        this.minDrink = this.catIdealKg * 40
        this.maxDrink = this.catIdealKg * 60
        this.catWater = this.minDrink + '~' + this.maxDrink
      } else {
        this.minDrink = this.catKg * 40
        this.maxDrink = this.catKg * 60
        this.catWater = this.minDrink + '~' + this.maxDrink
      }
      // 調用 Pinia store 中的 action 來更新狀態
      useCatsCountStore().updateCount({
        minKcal: this.minKcal,
        maxKcal: this.maxKcal,
        minDrink: this.minDrink,
        maxDrink: this.maxDrink,
        catKcal: this.catKcal
      })
    }
  }
}
</script>
