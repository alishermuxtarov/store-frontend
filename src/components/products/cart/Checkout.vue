<template>
  <div class="cart-products">
    <div class="row mt-5">
      <div class="col-sm-3"></div>

      <div class="col-sm-6">
        <form id="productCU">
          <div class="form-group">
            <label for="address">Address <span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              id="address"
              name="productName"
              placeholder="Enter Address"
              v-model="address"
              required
            />
          </div>
          <div class="form-group" v-if="!isLogged()">
            <label for="address">Email <span class="text-danger">*</span></label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              v-model="email"
              required
            />
          </div>
          <br/>
        </form>
        <cart-calculator ref="cartCalculator"></cart-calculator>
        <ul class="list-group mb-3">
          <router-link to="/" class="btn btn-primary mt-2 text-white">Continue Shipping</router-link>
          <a href="javascript:;;" class="btn btn-success mt-2 text-white" @click="createShippingDetail">
            Save & Pay
          </a>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
  import CartCalculator from "./CartCalculator";
  import {mapMutations, mapState} from "vuex";
  import {isLoggedIn} from "../../shared/service/authService";
  import {errorToaster, successToaster} from "../../shared/service/ErrorHandler";

  export default {
    name: "Checkout",
    components: {CartCalculator},
    computed: mapState(["cartProducts"]),
    data() {
      return {
        address: "",
        email: ""
      };
    },
    methods: {
      ...mapMutations(['EMPTY_LOCAL_CART']),
      isLogged() {
        return isLoggedIn()
      },
      createShippingDetail() {
        let products = this.cartProducts.map(p => ({
          product: p['id'],
          quantity: p['qty'],
        }))

        this.$http.post(`orders/`, {
          email: this.email,
          products: products,
          address: this.address
        }).then(() => {
          this.EMPTY_LOCAL_CART()
          successToaster(
            "Success",
            "Your order has been received successfully"
          );

          this.$router.push('/')
        }).finally(() => {
          this.loading = false;
        }).catch((error) => {
          console.log(error);

          errorToaster(
            "Error",
            "Please, fill the fields correctly"
          );
        });
      },
    },
  };
</script>

<style lang="css">
  .cart-products > div {
    text-align: start;
  }

  .cart-products #productCU > div {
    text-align: start;
  }

  .cart-products #productCU > button {
    text-align: center;
  }
</style>
