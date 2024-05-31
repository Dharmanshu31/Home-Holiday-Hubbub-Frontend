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
        ><router-link
          :to="{ path: '/property', query: { propertyCategory: image.text } }"
        >
          <Image
            :image="image.image"
            :alt="image.alt"
            :text="image.text"
            :path="image.path"
          />
        </router-link>
      </v-col>
    </v-row>
  </v-container>
  <div class="tw-mt-8 tw-flex tw-flex-wrap tw-gap-8 tw-justify-center">
    <div v-if="items.length > 0" v-for="(item, i) in items" :key="i">
      <HomeCard :item="item" />
    </div>
    <div v-else>
      <p class="tw-text-xl tw-font-bold">No Data Available Yet !!!!!</p>
    </div>
  </div>
  <Loader v-if="loading" />
  <br />
  <br />
</template>

<script setup>
import { useStore } from "vuex";
import HomeCard from "../components/HomeCard.vue";
import Image from "../components/homePage/Image.vue";
import { cImage } from "../data";
import { images } from "../data";
import { onMounted, ref, watchEffect } from "vue";
import debounce from "lodash.debounce";

const items = ref([]);
const store = useStore();
const page = ref(1);
const limit = ref(6);
const loading = ref(false);

let params = {
  page: page.value,
  limit: limit.value,
};

//fatch property data
const fetchData = async (params) => {
  if (loading.value) return;
  loading.value = true;
  try {
    const res = await store.dispatch("getProperty", params);
    if (res && res.data.properties.length > 0) {
      items.value.push(...res.data.properties);
    }
  } catch (err) {
    if (err && err.response) {
      toast.error("Somthing Wents Wrong Refrec Page");
    }
  }
  loading.value = false;
};
onMounted(async () => {
  await fetchData(params);
});

//fatch data on virtual scroll
const fetchNewData = debounce(async () => {
  if (
    window.innerHeight + document.documentElement.scrollTop + 1 >=
    document.documentElement.scrollHeight
  ) {
    page.value += 1;
    params.page = page.value;
    await fetchData(params);
  }
}, 200);

//fire when scroll happen
watchEffect(() => {
  window.addEventListener("scroll", fetchNewData);
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
