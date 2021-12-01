<template>
  <Slide v-if="slides != null" :slides="slides" />
  <div class="main">
    <BrandsList :brands="brands" />
    <ProductsList
      v-if="products != null"
      :products="products"
      @toDetailProduct="toDetailProduct"
      @handleChangePage="handleChangePage"
      :totalNumber="totalNumber"
    />
  </div>
</template>

<script>
import Slide from "../components/slide/Slide.vue";
import BrandsList from "../components/brands/BrandsList.vue";
import ProductsList from "../components/products/ProductsList.vue";
import BrandService from "../services/brand.service";
import SlideService from "../services/slide.service";
import ProductService from "../services/product.service";

export default {
  data() {
    return {
      brands: null,
      slides: null,
      products: null,
      totalNumber: null,
    };
  },
  components: {
    Slide,
    BrandsList,
    ProductsList,
  },
  methods: {
    //Get all Brands
    async initialBrands() {
      const [err, response] = await this.handle(BrandService.getAll());
      if (err) {
        console.log("Loi lay danh sach brand");
      } else {
        this.brands = response.data;
      }
    },
    //Get all slide
    async initialSlides() {
      const [err, response] = await this.handle(SlideService.getAll());
      if (err) {
        console.log("Loi lay danh sach brand");
      } else {
        this.slides = response.data;
      }
    },
    //Get a page Products
    async initialProducts(page) {
      const [err, response] = await this.handle(ProductService.getPage(page));
      if (err) {
        console.log("Loi lay danh sach product");
      } else {
        console.log(response.data);
        this.products = response.data;
        const [error, res] = await this.handle(
          ProductService.getTotalNumber(page)
        );
        if (error) {
          console.log("loi lay number page");
        } else {
          this.totalNumber = Math.ceil(res.data.number / 10);
          // console.log(res.data);
        }
      }
    },
    //Handle change page products
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
  mounted() {
    this.initialBrands();
    this.initialSlides();
    this.initialProducts(1);
  },
};
</script>

<style>
</style>