<template>
  <v-carousel
    class="slider tw-mt-8"
    hide-delimiters
    cycle
    :interval="4000"
    touch
  >
    <v-carousel-item
      v-for="(item, i) in cImage"
      :key="i"
      :src="item.src"
      cover
      content-class="slider"
    >
      <div
        class="tw-flex tw-h-full tw-justify-center tw-text-white tw-bg-black tw-bg-opacity-20 tw-shadow-lg tw-border-2 tw-border-emerald-900"
      >
        <div
          class="tw-text-center tw-font-bold tw-p-32 tw-text-base md:tw-text-3xl lg:tw-text-4xl xl:tw-text-4xl tw-shadow-black"
        >
          Welcome Home! Anywhere you roam
          <br />
          Stay in the moment. Make Your Memories
          <br />
          Discover the Joy of Simple Moments,
          <br />
          Find Your Adventure, Embrace the Journey
        </div>
      </div>
    </v-carousel-item>
  </v-carousel>

  <v-container class="tw-bg-newbg">
    <v-row>
      <v-col
        class="tw-flex tw-justify-center tw-text-heading tw-font-bold tw-text-center tw-text-4xl tw-mt-10"
        >Explore Top Categories</v-col
      >
    </v-row>
    <v-row>
      <v-col
        class="tw-mt-3 tw-text-center tw-max-w-52 tw-px-9"
        style="padding-inline: 12%"
        >Explore our wide range of vacation rentals that cater to all types of
        travelers. Immerse yourself in the local culture, enjoy the comforts of
        home, and create unforgettable memories in your dream
        destination.</v-col
      >
    </v-row>
    <v-row>
      <v-col
        v-for="(image, index) in images"
        :key="index"
        class="tw-flex tw-justify-center tw-gap-2"
        style="padding: 50px 0"
      >
        <Image
          :link="image.link"
          :image="image.image"
          :alt="image.alt"
          :text="image.text"
          :path="image.path"
        />
      </v-col>
    </v-row>
  </v-container>
  <div class="tw-mt-8 tw-flex tw-flex-wrap tw-gap-8 tw-justify-center">
    <div v-for="(item, i) in items" :key="i">
      <HomeCard :item="item" />
    </div>
  </div>
  <br />
  <br />
</template>

<script setup>
import { useStore } from "vuex";
import HomeCard from "../components/HomeCard.vue";
import Image from "../components/homePage/Image.vue";
import { cImage } from "../data";
import { images } from "../data";
import { onMounted, ref } from "vue";

const items = ref([]);
const store = useStore();
onMounted(async () => {
  await store.dispatch("getProperty");
  items.value = store.state.property.propertys;
});
</script>
<style scoped>
:deep(.v-btn--icon.v-btn--size-default) {
  background-color: transparent;
  box-shadow: none;
}
:deep(.v-btn--icon.v-btn--size-default) {
  color: transparent;
}
:deep(.v-carousel-item) {
  transition: opacity 0.5s, transform 0.5s;
}
@media screen and (max-width: 600px) {
  .title-text {
    font-size: 2rem;
  }
}
</style>
