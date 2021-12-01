<template>
  <!-- List of Product -->
  <div class="products mt-3">
    <h2>Sản phẩm</h2>
    <hr />
    <!-- Product List -->
    <div class="product-list">
      <ProductItem
        v-for="(product, key) in products"
        :key="key"
        :product="product"
        @click="toDetailProduct(product.id)"
      />

      <!-- Pagination -->
      <div class="pagination">
        <div
          class="page-prev"
          :class="{ disabled: pageCurrent == 1 }"
          @click="handleChangePage(false)"
        >
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </div>
        <div
          class="page-next"
          :class="{ disabled: pageCurrent == totalNumber }"
          @click="handleChangePage(true)"
        >
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </div>
      </div>
      <!-- End Pagination -->
    </div>
    <!-- Product List -->

    <!-- ----------------------------------------->
  </div>
</template>

<script>
import ProductItem from "./ProductItem.vue";
export default {
  data() {
    return {
      pageCurrent: 1,
    };
  },
  methods: {
    toDetailProduct(id) {
      this.$emit("toDetailProduct", id);
    },
    handleChangePage(type) {
      if (type) {
        if (this.pageCurrent != this.totalNumber) {
          this.pageCurrent++;
          this.$emit("handleChangePage", type, this.pageCurrent);
        }
      } else {
        if (this.pageCurrent != 1) {
          this.pageCurrent--;
          this.$emit("handleChangePage", type, this.pageCurrent);
        }
      }
    },
  },
  props: ["products", "totalNumber"],
  components: {
    ProductItem,
  },
};
</script>

<style>
.products {
  background-color: #d3d3d321;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
}
.product {
  /* width: 18%; */
  margin: 10px 10px;
}
.product img {
  width: 100%;
}
.product .lovers {
  display: flex;
  padding-left: 3px;
}
.product .lovers i {
  color: #ae5fcf;
  padding-top: 4px;
  margin-right: 4px;
}
.product .name {
  margin-bottom: 0;
  font-size: 18px;
  font-weight: 600;
  padding-left: 3px;
  padding-right: 3px;
}
.product .name:hover {
  cursor: pointer;
}
.product .price {
  font-weight: 600;
  color: #eb7552;
  font-size: 17px;
  padding-left: 3px;
}

.image-product {
  position: relative;
}
.image-product .detail {
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  background: #b7b7b5b0;
  width: 100%;
  height: 100%;
}
.image-product .detail h5 {
  text-align: center;
  padding: 5px 0;
  width: 60%;
  background-color: black;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.image-product .detail h5:hover {
  background-color: white;
  color: black;
  transition: 0.3s;
  cursor: pointer;
}

.image-product:hover .detail {
  display: block;
}

.page-number {
  margin: 0 5px;
  color: rgb(84 85 86);
}
.page-prev {
  position: absolute;
  top: 50%;
  font-size: 40px;
  left: 0;
  cursor: pointer;
  transform: translate(0, -50%);
}
.page-next {
  position: absolute;
  top: 50%;
  right: 0;
  font-size: 40px;
  cursor: pointer;
  transform: translate(0, -50%);
}
.page-prev:hover,
.page-number:hover,
.page-next:hover {
  cursor: pointer;
}
.disabled {
  color: rgb(202, 202, 202);
}
.page-active {
  color: #0502c9;
  text-decoration: underline;
}
</style>