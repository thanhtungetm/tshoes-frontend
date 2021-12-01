<template>
  <div id="cart-detail">
    <ul v-if="cart" class="list-group">
      <li class="list-group-item">
        <div v-for="(item, key) in cart" :key="key" class="cart-item">
          <img :src="item.idProduct.imgUrl" alt="" />
          <div class="name-price">
            <span>{{ item.idProduct.name }}</span>
            <br />
            <span>[size: {{ item.size }}]</span>
            <span class="price">{{
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(item.idProduct.price)
            }}</span>
          </div>
          <div class="quality-modify">
            <i
              class="fa fa-minus quality-minus"
              @click="handleChangeQuality(false, item)"
              aria-hidden="true"
            ></i>
            <div class="quality">{{ item.quality }}</div>
            <i
              class="fa fa-plus quality-plus"
              @click="handleChangeQuality(true, item)"
              aria-hidden="true"
            ></i>
          </div>
          <i
            class="fa fa-times delete-item"
            @click="removeItem(item._id)"
            aria-hidden="true"
          ></i>
        </div>
      </li>

      <li v-if="!isOrder" class="list-group-item">
        <div class="pre-total">
          <h4>Tạm tính:</h4>
          <h4 style="color: #e52f2f">
            {{
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(cartTotal)
            }}
          </h4>
        </div>
        <h4 v-if="$route.name != 'Cart'" @click="goToCart" class="btn-cart">
          <button type="button" class="btn btn-primary">Đến giỏ hàng</button>
        </h4>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    isOrder: {
      default: false,
    },
  },
  methods: {
    ...mapActions(["remove", "add"]),
    goToCart() {
      this.$emit("goToCart");
      this.$router.push({ name: "Cart" });
    },
    removeItem(id) {
      this.remove(id);
    },
    async handleChangeQuality(check, item) {
      let qual;
      if (check) {
        console.log("+", item.quality, item.idProduct._id);
        qual = 1;
      } else {
        if (item.quality == 1) {
          //remove product from cart
          console.log("Xoa", item.quality);
          this.remove(item._id);
          return 0;
        } else {
          //sub quantity
          console.log("-", item.quality, item.idProduct._id);
          qual = -1;
        }
      }
      console.log(qual);
      const id = item.idProduct._id;
      const size = item.size;
      // Change quality
      const product = {
        id,
        quality: qual,
        size,
      };
      console.log(product);
      const res = await this.handle(this.add(product));
      console.log("thay doi so luong thanh cong", res);
    },
  },
  computed: {
    ...mapGetters({ cart: "getCart" }),
    cartTotal() {
      let sum = 0;
      for (let i = 0; i < this.cart.length; i++)
        sum += Number(this.cart[i].idProduct.price) * this.cart[i].quality;
      return sum;
    },
  },
  mounted() {},
};
</script>

<style scoped>
.pre-total {
  text-align: right;
  display: flex;
}
.btn-cart {
  text-align: center;
}
.price {
  color: red;
}
.cart-item {
  display: flex;
  margin-top: 5px;
  align-items: center;
  justify-content: space-between;
}
.cart-item img {
  width: 50px;
  height: 50px;
}
.cart-item span {
  margin: 0 4px;
}
.quality {
  /* font-weight: 800; */
  font-size: 20px;
  margin: auto 4px;
}
.quality-plus,
.quality-minus,
.delete-item {
  margin: auto 3px;
  font-size: 20px !important;
}
.quality-plus {
  color: #9a9f9a;
}
.quality-minus {
  color: #c3c3c3;
}

.name-price {
  margin-left: 5px;
  width: 80%;
}
.quality-modify {
  width: 30%;
  display: flex;
}
/* .delete-item{
  
} */
</style>