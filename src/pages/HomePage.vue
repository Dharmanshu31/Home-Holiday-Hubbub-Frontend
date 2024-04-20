<template>
  <v-carousel hide-delimiters cycle :interval="4000" touch>
    <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" cover>
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
</template>

<script setup>
const items = [
  { src: "/assets/imags/slide.jpg" },
  { src: "/assets/imags/pool_cat.jpg" },
  { src: "/assets/Listing1/1.jpg" },
  { src: "/assets/imags/island_cat.webp" },
  { src: "/assets/Listing1/7.jpg" },
  { src: "/assets/Listing2/7.jpg " },
];
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
    font-size: 2rem; /* Adjust font size for smaller screens */
  }
}
</style>
