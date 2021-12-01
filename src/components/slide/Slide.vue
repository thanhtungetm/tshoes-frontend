<template>
  <!-- Slider -->
  <div class="slide-container">
    <div class="slide">
      <img :src="slideCurrent" class="animate" alt="" />
    </div>
    <div class="prev-slide fs-1 text" @click="prevSlide">
      <i class="fa fa-chevron-left" aria-hidden="true"></i>
    </div>
    <div class="next-slide fs-1 text" @click="nextSlide">
      <i class="fa fa-chevron-right" aria-hidden="true"></i>
    </div>
    <div class="number-slide">
      <i
        v-for="(slide, k) in slides"
        :key="k"
        class="fa fa-circle"
        v-bind:class="{ 'active-slide': k == current }"
        @click="setCurrent(k)"
        aria-hidden="true"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
    };
  },
  props: ["slides"],
  computed: {
    slideCurrent() {
      console.log("slides", this.slides[this.current]);
      return this.slides[this.current].imgUrl;
    },
  },
  methods: {
    nextSlide() {
      this.current++;
      if (this.current >= this.slides.length) {
        this.current = 0;
      }
    },
    prevSlide() {
      this.current--;
      if (this.current < 0) {
        this.current = this.slides.length - 1;
      }
    },
    setCurrent(key) {
      this.current = key;
    },
  },
  mounted() {
    // setInterval(()=>{
    //     this.nextSlide();
    //     console.log("Da hoat dong");
    // },5000);
    // console.log("a");
    // this.nextSlide();
  },
};
</script>

<style>
.slide-container {
  margin: 5px auto;
  width: 100%;
  overflow: hidden;
  height: fit-content;
  position: relative;
}
.slide-container .slide {
  position: relative;
  width: 200%;
}

.slide-container .slide img {
  width: 50%;
  margin-left: 100%;
}
.slide .animate {
  /* animation-name: example; */
  /* animation-duration: 4s; */
  transition: 2s;
  margin-left: 0 !important;
}
@keyframes example {
  0% {
    background-color: red;
    margin-left: 100%;
  }

  100% {
    background-color: red;
    margin-left: 0;
  }
}
.prev-slide,
.next-slide {
  position: absolute;
  top: 50%;
  font-size: 50px;
  cursor: pointer;
  transform: translate(0, -50%);
}
.prev-slide:hover,
.next-slide:hover {
  color: rgb(238, 238, 238);
}
.prev-slide {
  left: 0;
}
.next-slide {
  right: 0;
}
.number-slide {
  cursor: pointer;
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.number-slide i {
  margin: 0 3px;
}
.number-slide i:hover {
  color: rgb(172, 167, 167);
}
.active-slide {
  color: white;
}
</style>