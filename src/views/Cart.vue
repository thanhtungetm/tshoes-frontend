<template>
  <!-- <div class="main mt-3"> -->
    <h2>Giỏ hàng</h2>
    <hr />
    <div v-if="currentUser" id="cart-info" class="col-12 col-md-6">
      <CartDetail />
      <button
        type="button"
        class="btn btn-lg btn-primary mt-3"
        @click="goToOrder"
      >
        Đặt hàng
      </button>
    </div>
  <!-- </div> -->
</template>

<script>
import CartDetail from "../components/header/cart/CartDetail.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    CartDetail,
  },
  computed: {
    ...mapGetters({
      currentUser: "loggedInUser",
    }),
  },
  methods: {
    goToOrder() {
      this.$router.push({ name: "Order" });
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>

<style>
#cart-info {
}
#cart-info .name-price {
  width: 50%;
}
#cart-info .cart-item img {
  width: 16.66666%;
  height: auto;
}
#cart-info button {
  margin: auto;
}
</style>