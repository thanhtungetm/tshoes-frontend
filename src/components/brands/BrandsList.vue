<template>
  <!-- Category brands -->
  <div class="category mt-3">
    <h2>
      Thương hiệu nổi bật
      <tr></tr>
    </h2>
    <hr />
    <div class="d-flex justify-content-evenly flex-wrap">
      <BrandItem v-for="(brand, key) in brands" :key="key" :brand="brand" />
    </div>
  </div>
</template>

<script>
import BrandItem from "./BrandItem.vue";
export default {
  data() {
    return {};
  },
  props: ["brands"],
  components: {
    BrandItem,
  },
};
</script>

<style>
.category {
  background: linear-gradient(
    90deg,
    rgba(237, 237, 237, 0.8606151933429622) 1%,
    rgba(218, 218, 218, 0.6785423642113095) 88%
  );
}

.card-brand {
  /* width: 18%; */
  text-align: center;
  position: relative;
}
.card-brand img {
  width: 100%;
}
.card-brand .more {
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(223, 223, 223);
  background: radial-gradient(
    circle,
    rgba(223, 223, 223, 0.8550129524466037) 8%,
    rgba(145, 145, 145, 0.44324824656425066) 86%
  );
  transition: 0.3s;
}
.card-brand .more .more-btn {
  width: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 7px 2px;
  box-shadow: 1px -4px 6px #4e4c4c;
  background-color: black;
  color: white;
  transition: 0.3s;
}
.card-brand .more .more-btn:hover {
  background-color: white;
  color: black;
  cursor: pointer;
}
.card-brand:hover .more {
  display: block;
}
</style>