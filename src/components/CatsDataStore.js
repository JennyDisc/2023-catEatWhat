// 取出 Pinia 裡的 defineStore 方法
import { defineStore } from 'pinia'

// useCatsCountStore 是自行定義 Pinia store 的函數，之後可以通過調用它來取得 store 實例
// 寫法1
export const useCatsCountStore = defineStore({
    // id 是定義 Store 名稱(唯一性)
    id: 'myStore',
    state: () => ({
        inputCount: {
            minKcal: 0,
            maxKcal: 0,
            minDrink: 0,
            maxDrink: 0,
            catKcal: ''
        }
    }),
    // actions 概念同 Vue 的 methods
    // 透過呼叫將資料存到 state 中，所以 actions 可以用來更新 state 資料的方法
    actions: {
        updateCount(data) {
            // 展開運算子(一次性更新多個屬性)
            this.inputCount = { ...this.inputCount, ...data };
        }
    },
})