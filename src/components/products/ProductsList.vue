<template>
  <div class="products">
    <div class="row">
      <div class="col-md-4" v-for="(item, index) in products" :key="index">
        <card-template :item="item" />
      </div>
    </div>
  </div>
</template>


<script>
import CardTemplate from "../shared/CardTemplate";
export default {
  name: "productslist",
  props: ["products"],
  components: { CardTemplate },
  data() {
    return {
      selectedProduct: Object,
    };
  },
  mounted() {},
};
</script>

<style>
.footerIcons {
  font-size: 95%;
}

/*.card {
  height: 490px;
}*/
.card-text {
  height: 70px;
  overflow: hidden;
}
</style>
