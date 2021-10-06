<template>
  <div class="products">
    <div class="row">
      <div class="col-md-3 order-md-1 mb-4">
        <product-filter @onCategorySelect="cat => category = cat" :categories="categories" :sellers="sellers" />
      </div>
      <div class="col-md-9 order-md-2">
        <!-- <h4 class="mb-3">Billing address</h4> -->
        <card-loader :loopCount="8" v-if="loading" />
        <products-list :products="products" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductsList from "@/components/products/ProductsList";
import CardLoader from "@/components/shared/CardLoader";
import ProductFilter from "@/components/products/filters/ProductFilter";
import axios from "axios";

export default {
  name: "allProducts",
  components: { ProductsList, CardLoader, ProductFilter },
  data() {
    return {
      categories: [],
      sellers: [],
      products: [],
      loading: false,
      category: null
    };
  },
  methods: {
    getProducts: function(categoryId = undefined) {
      this.loading = true;
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/products/`, {
          params: {category_id: categoryId}
        })
        .then((response) => {
          this.loading = false;
          this.products = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllCategories: function() {
      this.loading = true;
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/categories/`)
        .then((response) => {
          this.loading = false;
          this.categories = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  created() {
    this.getAllCategories();
  },

  watch: {
    category: {
      immediate: true,
      handler(val) {
        if (val && val.id) {
          this.getProducts(val.id)
        } else {
          this.getProducts()
        }
      }
    }
  }
};
</script>

<style lang="css">
.products {
  margin-top: 40px;
}
</style>
