<template>
  <div class="main">
    <h2 class="brand-name">Thương hiệu: {{ $route.params.name }}</h2>
    <div v-if="!!this.$route.params.id" class="product-list">
      <ProductsList
        v-if="products != null"
        :products="products"
        @toDetailProduct="toDetailProduct"
        @handleChangePage="handleChangePage"
        :totalNumber="totalNumber"
      />
    </div>
  </div>
</template>

<script>
import ProductsList from "../components/products/ProductsList.vue";
import ProductService from "../services/product.service";
export default {
  data() {
    return {
      products: null,
      totalNumber: null,
    };
  },
  components: {
    ProductsList,
  },
  methods: {
    async initialProducts(page) {
      const [err, response] = await this.handle(
        ProductService.findProductOfBrand(this.$route.params.id, page)
      );
      if (err) {
        console.log("Loi lay danh sach product");
      } else {
        console.log(response.data);
        this.products = response.data;
        const [error, res] = await this.handle(
          ProductService.getTotalNumberOfBrand(this.$route.params.id)
        );
        if (error) {
          console.log("loi lay number page");
        } else {
          this.totalNumber = Math.ceil(res.data.number / 10);
          console.log(res.data);
        }
      }
    },
    async handleChangePage(type, i) {
      console.log(type);
      if (type) {
        this.initialProducts(i);
      } else {
        this.initialProducts(i);
      }
    },
    toDetailProduct(id) {
      this.$router.push({ name: "ProductDetail", params: { id } });
    },
  },
  watch: {
    "$route.params.id": {
      handler: function () {
        this.initialProducts(1);
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    // console.log(!!this.$route.query.id);
    if (!this.$route.params.id) {
      this.$router.push({ name: "Home" });
    } else {
      this.initialProducts(1);
    }
  },
};
</script>

<style>
.brand-name {
  text-align: center;
}
</style>