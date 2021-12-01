<template>
  <div class="main mt-4">
    <div class="col-12 sumary">
      <div class="image-detail-product col-12 col-md-4">
        <img :src="product.imgUrl" alt="" />
      </div>
      <!-- Sumary of the product -->
      <div class="sumary-detail-product">
        <!-- Name of the product -->
        <h4>{{ product.name }}</h4>
        <!-- Price -->
        <h3 style="color: #e52f2f">
          {{
            new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price)
          }}
        </h3>
        <!-- Lovers number -->
        <div class="lovers">
          <i class="fa fa-heart" aria-hidden="true"></i>
          <span> &nbsp;{{ product.lovers.length }} &nbsp;lượt yêu thích</span>
        </div>
        <!-- Brand -->
        <div class="brand-name mt-3">
          <h4>
            Thương hiệu: <span>{{ product.brand.name }}</span>
          </h4>
          <img :src="product.brand.imgUrl" alt="" width="100" height="100" />
        </div>
        <!-- Selection size -->
        <div class="size-selection mt-3">
          <h4>Chọn Size:</h4>
          <select
            v-model="size"
            class="form-select"
            aria-label="Default select example"
          >
            <option v-for="size in product.sizes" :key="size" :value="size">
              {{ size }}
            </option>
          </select>
        </div>
        <!-- Selection quality -->
        <div class="quality-selection mt-3">
          <h6>Số lượng</h6>

          <div class="quality-modify-selection">
            <i
              class="fa fa-minus quality-minus"
              aria-hidden="true"
              @click="quality = quality > 1 ? quality - 1 : 0"
            ></i>
            <input type="text" name="" id="" v-model="quality" />
            <i
              class="fa fa-plus quality-plus"
              aria-hidden="true"
              @click="quality++"
            ></i>
          </div>
        </div>

        <!-- Add to cart button -->
        <div id="add-to-card">
          <button
            type="button"
            class="btn btn-lg btn-primary"
            @click="addToCart"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
      <!-- END Sumary of the Product -->
    </div>

    <!-- Description of the product -->
    <div class="detail-product mt-3">
      <h3>Mô tả sản phẩm</h3>
      <hr />

      <p v-for="(description, key) in product.descriptions" :key="key">
        {{ description }}
      </p>
    </div>
    <!-- END Description of the product -->
  </div>
</template>

<script>
import ProductService from "../services/product.service";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      product: {
        id: null,
        name: "Adidas Falcon Crystal White Navy",
        sizes: [36, 37, 38, 39, 40],
        price: 1000000,
        lovers: 9999,
        brand: "",
        descriptions: [],
      },
      quality: 1,
      size: null,
    };
  },
  computed: {
    ...mapGetters(["userLoggedIn"]),
  },
  methods: {
    ...mapActions(["add"]),
    async inittialDetail() {
      const [err, res] = await this.handle(
        ProductService.get(this.$route.params.id)
      );
      if (err) console.log("Loi lay chi tiet san pham");
      else {
        this.product = res.data;
      }
    },
    //add to Cart
    async addToCart() {
      // console.log(this.userLoggedIn)
      if (this.userLoggedIn) {
        if (this.size == null) {
          alert("Vui lòng chọn size!");
        } else {
          const product = {
            id: this.product.id,
            quality: this.quality,
            size: this.size,
          };
          console.log(product);
          const res = await this.handle(this.add(product));

          console.log("thanh cong", res);
        }
      } else {
        alert("Vui lòng đăng nhập hoặc đăng ký để thêm vào giỏ hàng");
      }
    },
  },
  mounted() {
    console.log(this.$route.params.id);
    this.inittialDetail();
  },
};
</script>

<style>
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
.quality-minus:hover,
.quality-plus:hover {
  cursor: pointer;
}
.sumary {
  display: flex;
}

/* .image-detail-product{

} */
.image-detail-product img {
  width: 100%;
}
.sumary-detail-product {
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.size-selection {
  margin-top: 20px;
}
.quality-modify-selection {
  display: flex;
  font-size: 20px;
}
.quality-modify-selection input {
  width: 50px;
  margin: 5px;
  text-align: center;
}

/* #add-to-card{
    
} */
</style>