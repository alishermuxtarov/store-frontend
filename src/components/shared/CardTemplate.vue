<template>
  <div class="cardTemplate">
    <div class="card mb-4 shadow-sm">
      <img
        class="card-img-top mt-2"
        v-bind:src="item.image"
        alt="Product Image"
        style="max-height: 700px; max-width: 200px; margin: auto"
      />
      <div class="card-body">
        <span class="card-text">{{ item.name }}</span><hr>
        <span class="card-text font-weight-bold">${{ item.price }}</span>
        <!--<span class="card-text" v-html="item.description.substr(0, 100)"></span>-->
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              v-on:click="navigateProductDetail(item)"
            >
              View
            </button>

          </div>
          <small class="text-muted footerIcons">
            <a href="javascript:;;" class="p-2">
              <i class="fa fa-heart"></i>
            </a>
            <a href="javascript:;;" class="p-2" v-on:click="addToCart(item)">
              <i class="fa fa-shopping-cart"></i>
            </a>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import _ from "lodash";
export default {
  name: "cardTemplate",
  props: ["item"],
  data() {
    return {
      showModal: false,
    };
  },
  components: {},
  computed: mapState(["loggedUser"]),
  methods: {
    navigateProductDetail(product) {
      this.$router.push({
        name: "productDetails",
        params: { id: product.id },
      });
    },

    ...mapMutations(["ADD_CART_LOCAL"]),

    addToCart(product) {
      const data = _.find(this.$store.getters.cartProducts, product);
      if (data) {
        data['qty'] += 1;
        // infoToaster("Already Added", "Product Already Added");
      } else {
        // successToaster("Added Successfully", "Product Added Successfully");
        product['qty'] = 1
        this.ADD_CART_LOCAL(product);
      }
    },

  },
  mounted() {},
};
</script>
