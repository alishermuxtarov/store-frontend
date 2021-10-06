<template>
  <div class="productFilter">
    <div id="prdfilter">
      <h5 class="d-flex mb-3">
        <span class="text-muted">Categories:</span>
      </h5>
      <ul class="list-group">
        <li
                style="cursor: pointer"
                @click="$emit('onCategorySelect', category)"
                class="list-group-item"
                v-for="(category) in categories"
                :key="category.id"
                v-bind:value="category.name">
          {{ category.name }} <span class="text-muted">({{ category.products_count }})</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "productFilter",
  props: ["categories"],
  computed: mapState(["loggedUser"]),
};
</script>

<style lang="css">
.productFilter #prdfilter {
  text-align: start !important;
}
</style>
