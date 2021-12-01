<template>
  <div class="card-brand col-5 col-md-2">
    <img :src="brand.imgUrl" alt="" />
    <h4>{{ brand.name }}</h4>
    <div class="more">
      <div
        class="more-btn"
        @click="
          $router.push({
            name: 'Brand',
            params: { name: brand.name, id: brand.id },
          })
        "
      >
        <h4>Xem Thêm</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["brand"],
};
</script>

<style>
</style>