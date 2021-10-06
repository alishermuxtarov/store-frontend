<template>
  <div class="cart-products">
    <div class="row mt-5">
      <div class="col-3">
        <div class="row">
        </div>
      </div>
      <div class="col-6">
        <template v-if="cartProducts.length > 0">
          <cart-calculator ref="cartCalculator"></cart-calculator>
          <ul class="list-group mb-3">
            <router-link to="/" class="btn btn-primary mt-2 text-white">Continue Shipping</router-link>
            <router-link to="/checkout" class="btn btn-danger mt-2 text-white">Checkout</router-link>
          </ul>
        </template>
        <template v-else>
          <div class="error-template container">
            <h1>Oops!</h1>
            <h2>No Products Found</h2>
            <div class="error-details">Your cart is empty</div>
            <div class="error-actions">
              <a class="btn text-white">
                <span class="glyphicon glyphicon-envelope"></span>
                <router-link to="/">Take me to Homepage</router-link
                >
              </a>
            </div>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CartCalculator from "./CartCalculator";
export default {
  name: "CartProducts",
  components: { CartCalculator },
  data() {
    return {};
  },
  computed: mapState(["cartProducts"]),
  mounted() {},
};
</script>

<style>
.error-template {
  padding: 40px 15px;
  text-align: center;
}

.error-actions {
  margin-top: 15px;
  margin-bottom: 15px;
}

.error-actions .btn {
  margin-right: 10px;
}
</style>
