<template>
  <div class="search col-5">
    <form class="d-flex" @submit.prevent="handleSearch">
      <input
        v-model="nameSearch"
        class="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
    <div v-if="result" class="result">
      <ResultProduct
        v-for="(product, key) in result"
        :key="key"
        :product="product"
        @click="gotoDetailProduct(product.id)"
      />
      <!-- <ResultProduct/> -->
      <div v-if="result.length==0" class="empty-result">
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
          <symbol
            id="check-circle-fill"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
            />
          </symbol>
          <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
            <path
              d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
            />
          </symbol>
          <symbol
            id="exclamation-triangle-fill"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
            />
          </symbol>
        </svg>
        <div class="alert alert-warning d-flex align-items-center" role="alert">
          <svg
            class="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label="Warning:"
          >
            <use xlink:href="#exclamation-triangle-fill" />
          </svg>
          <div>Không tìm thấy sản phẩm</div>
        </div>
      </div>

      <div class="close-result">
        <button
          type="button"
          @click="result = null"
          class="btn btn-primary btn-sm"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from "../../services/product.service";
import ResultProduct from "./ResultProduct";
export default {
  data() {
    return {
      nameSearch: "",
      result: null,
    };
  },
  methods: {
    async handleSearch() {
      console.log(this.nameSearch);
      const [err, res] = await this.handle(
        ProductService.findProduct(this.nameSearch)
      );
      if (err) console.log(err);
      else {
        if (res.data.length > 10) this.result = res.data.slice(0, 10);
        else this.result = res.data;
        console.log(res.data);
      }
    },
    gotoDetailProduct(id) {
      this.result = null;
      this.$router.push({ name: "ProductDetail", params: { id } });
    },
  },
  components: {
    ResultProduct,
  },
};
</script>

<style>
.close-result {
  cursor: pointer;
  font-weight: bold;
  text-align: center;
}
/* Search */
.search {
  position: relative;
}
.result {
  position: absolute;
  width: 100%;
  height: fit-content;
  z-index: 1000;
  background-color: #fbfdff;
  padding: 10px 2px;
}

/* product of result */
.result-product {
  display: flex;
  margin: 5px 5px;
}
.result-product:hover {
  cursor: pointer;
  background-color: rgba(197, 197, 197, 0.356);
}
.result-product img {
  width: 17%;
}
.result-product .info {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: center;
}
.result-product .info .name {
  font-weight: 400;
}
.result-product .info .price {
  color: #e1ba2d;
  font-weight: 400;
}
</style>