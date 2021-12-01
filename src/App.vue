<template>
  <div class="container">
    <Header />
    <router-view> </router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/header/Header.vue";
import Footer from "./components/footer/Footer.vue";
import { mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  methods: {
    ...mapMutations(["initAuthState", "initCart"]),
  },
  mounted() {
    this.initAuthState();
    this.initCart();
  },
};
</script>
  
<style>
a {
  text-decoration: none;
  color: black;
}
</style>
