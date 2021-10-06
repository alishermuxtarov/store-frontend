<template>
  <div class="cart-calculator">
    <h4 class="d-flex justify-content-between align-items-center mb-3">
      <span class="text-muted">Your cart</span>
      <span class="badge badge-primary badge-pill">{{ cartProducts.length }}</span>
    </h4>

    <ul class="list-group mb-3">
      <li
        class="list-group-item d-flex justify-content-between lh-condensed"
        v-for="(product, index) in cartProducts"
        :key="index"
      >
        <div>
          <img class="card-img-top mt-2" v-bind:src="product.image" alt="product image" style="max-height: 30px; max-width: 30px; margin: auto"/>
          {{ product.name }} <b>x {{ product.qty }}</b>
        </div>

        <span class="text-muted" style="width: 120px">
          $ {{ product.price }}
          <small class="text-muted footerIcons">
            <a href="javascript:;;" class="p-2" v-on:click="removeProductCart(product)">
              <i class="fa fa-trash"></i>
            </a>
          </small>
        </span>

      </li>

      <hr/>

      <li class="list-group-item d-flex justify-content-between">
        <span>Total</span>
        <strong>$ {{ totalValue.toFixed(2) }}</strong>
      </li>

    </ul>
  </div>
</template>
<script>
  import {mapMutations, mapState} from "vuex";
export default {
  name: "cartCalculator",
  data() {
    return {
      totalValue: 0.0,
    };
  },
  computed: mapState(["cartProducts"]),
  methods: {
    /* Resetting the store and localstorage after removing product from cart */
    ...mapMutations(["SET_CART_PRODUCTS"]),

    removeProductCart(product) {
      const products = JSON.parse(localStorage.getItem("iki-cart"));
      for (let i = 0; i < products.length; i++) {
        if (products[i]._id === product._id) {
          products.splice(i, 1);
        }
      }
      this.SET_CART_PRODUCTS(products);
      localStorage.setItem("iki-cart", JSON.stringify(products));
      this.calulateTotalPrice();
    },

    calulateTotalPrice() {
      this.totalValue = 0;
      this.cartProducts.forEach((product) => {
        this.totalValue += parseFloat(product.price) * product.qty;
      });
    },
  },
  created() {
    this.calulateTotalPrice();
  },
};
</script>
<style>
</style>
