<template>
    <div class="result-product">
                <img :src="product.imgUrl" alt="">
                <div class="info">
                  <span class="name">{{product.name}}</span>
                  <span class="price">{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}}</span>
                </div>
    </div>
</template>

<script>
export default {
  props:[
    'product'
  ]
}
</script>

<style>

</style>