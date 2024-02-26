<template>
  <div class="container">
    <HeaderView></HeaderView>
    <CountView></CountView>
    <DietView></DietView>
    <TableView></TableView>
    <!-- <TableOriginalView></TableOriginalView> -->
    <FooterView></FooterView>
  </div>
</template>

<script>
import HeaderView from './views/HeaderView.vue'
import CountView from './views/CountView.vue'
import DietView from './views/DietView.vue'
import TableView from './views/TableView.vue'
// import TableOriginalView from './views/TableOriginalView.vue'
import FooterView from './views/FooterView.vue'

export default {
  components: {
    HeaderView,
    CountView,
    DietView,
    TableView,
    // TableOriginalView,
    FooterView,
  }
}
</script>
