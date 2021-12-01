<template>
  <div class="main mt-3 col-md-6" style="margin: auto">
    <div class="alert alert-warning" role="alert">
      <h1>Developing....</h1>
    </div>
    <h2 style="text-align: center">Dat hang</h2>
    <hr />
    <h6>Nguoi dat: <span class="name">Le Thanh Tung</span></h6>
    <h6>Dien thoai: <span class="name">0868378827</span></h6>
    <h3>Thong tin san pham</h3>
    <div id="cart-info" class="col-12">
      <CartDetail :isOrder="true" />

      <h5>Dia chi</h5>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
        />
        <label class="form-check-label" for="flexRadioDefault1">
          Dia chi mac dinh
        </label>
      </div>
      <div class="adress">Nui Sap, Thoai Son, An Giang</div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          checked
        />
        <label class="form-check-label" for="flexRadioDefault2">
          Dia chi khac
        </label>
      </div>
      <input
        class="form-control form-control-lg col-6"
        type="text"
        placeholder="Nhap dia chi khac"
        aria-label=".form-control-lg example"
      />

      <div class="sumtotal">
        <div class="sum-element">
          <h5>Tam tinh:</h5>
          <h5>Thue:</h5>
          <h5>Phi van chuyen:</h5>
          <h5>Tong cong:</h5>
        </div>
        <div class="sum-total col-3">
          <h5>68.686.686d</h5>
          <h5>68.686d</h5>
          <h5>68.686d</h5>
          <h5>686.686.686d</h5>
        </div>
      </div>
      <button
        type="button"
        @click="goToOrderDetail"
        class="btn btn-lg btn-primary mt-3 d-flex"
      >
        Xac nhan dat hang
      </button>
    </div>
  </div>
</template>

<script>
import CartDetail from "../components/header/cart/CartDetail.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    CartDetail,
  },
  computed: {
    ...mapGetters(["isEmptyCart"]),
  },
  methods: {
    ...mapActions(["getAll"]),
    goToOrderDetail() {
      this.$router.push({ name: "OrderDetail" });
    },
  },
};
</script>

<style>
.sumtotal {
  text-align: right;
  display: flex;
  justify-content: flex-end;
}
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