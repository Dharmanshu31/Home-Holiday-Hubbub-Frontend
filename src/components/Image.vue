<template>
  <a :href="link">
    <div
      class="tw-relative tw-w-64 tw-h-52 tw-flex tw-justify-center tw-items-center"
    >
      <img :src="image" :alt="alt" class="tw-absolute tw-w-full tw-h-full" />
      <div
        class="tw-absolute tw-w-full tw-h-full tw-bg-black tw-opacity-55 tw-scale-100 hover:tw-scale-75 transition-transform tw-duration-500 ease-in-out"
      ></div>
      <div
        class="tw-relative tw-text-white tw-flex tw-flex-col tw-items-center"
      >
        <svg-icon
          type="mdi"
          :path="path"
          class="tw-text-white tw-size-12"
        ></svg-icon>
        <p class="tw-text-[25px] tw-font-semibold">{{ text }}</p>
      </div>
    </div>
  </a>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";

defineProps({
  link: String,
  image: String,
  alt: String,
  path: String,
  text: String,
});
</script>

<style scoped></style>
