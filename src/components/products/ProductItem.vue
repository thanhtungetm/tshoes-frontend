<template>
  <!-- Product -->
  <div class="product col-5 col-sm-3 col-md-2">
    <div class="image-product">
      <img :src="product.imgUrl" alt="" />
      <div class="detail">
        <h5>Chi tiết</h5>
      </div>
    </div>
    <p class="name fs-6 text">
      {{ product.name }}
    </p>
    <div class="lovers">
      <i class="fa fa-heart" aria-hidden="true"></i>
      <span>1.000</span>
    </div>
    <p class="price fs-5">
      {{
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(product.price)
      }}
    </p>
  </div>
  <!-- End product -->
</template>

<script>
export default {
  props: ["product"],
};
</script>

<style>
</style>