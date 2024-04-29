<template>
  <v-container class="tw-mt-8 tw-bg-newbg">
    <v-row>
      <v-col class="tw-text-heading tw-font-bold tw-text-3xl tw-my-10 tw-ml-11">
        Publish Your Place
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form>
          <div class="tw-bg-white tw-rounded-2xl tw-py-8 tw-px-10">
            <h1 class="tw-text-red-500 tw-text-2xl tw-font-bold">
              Step 1: Tell us about your place
            </h1>
            <hr />
            <h3 class="tw-text-lg tw-font-bold tw-mt-8">
              Which of these categories best describes your place?
            </h3>
            <div
              class="tw-m-7 tw-flex tw-flex-wrap tw-gap-5 tw-justify-center tw-items-center"
            >
              <div v-for="(icon, i) in icons" :key="i">
                <div
                  class="filter-border tw-border tw-border-gray-500 tw-w-28 tw-h-24 tw-rounded-xl tw-cursor-pointer tw-flex tw-justify-center tw-items-center tw-flex-col tw-text-[19px]"
                  @click="setIconeName(icon.text)"
                >
                  <v-icon :icon="icon.name" class="tw-text-3xl"></v-icon>
                  <p class="tw-text-center">
                    {{ icon.text }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const icons = [
  { name: "mdi-beach", text: "Beachfront" },
  { name: "mdi-wind-power", text: "Windmills" },
  { name: "mdi-home-city", text: "Iconic cities" },
  { name: "mdi-image-filter-hdr", text: "Countryside" },
  { name: "mdi-pool", text: "Amazing Pools" },
  { name: "mdi-island", text: "Islands" },
  { name: "mdi-waves", text: "Lakefront" },
  { name: "mdi-ski", text: "Ski-in/out" },
  { name: "mdi-castle", text: "Castles" },
  { name: "mdi-beach", text: "Caves" },
  { name: "mdi-campfire", text: "Camping" },
  { name: "mdi-snowflake", text: "Arctic" },
  { name: "mdi-cactus", text: "Desert" },
  { name: "mdi-barn", text: "Barns" },
  { name: "mdi-diamond-stone", text: "Luxury" },
  { name: "mdi-home-flood", text: "Other" },
];
const className =
  "filter-border tw-border tw-border-gray-500  tw-w-28 tw-h-24 tw-rounded-xl tw-cursor-pointer tw-flex tw-justify-center tw-items-center tw-flex-col tw-text-[19px]";
const iconName = ref("");

const setIconeName = (name) => {
  iconName.value = name;
  console.log(iconName.value);
};
</script>

<style scoped>
.v-container {
  max-width: 100%;
}
hr {
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  border-style: inset;
  border-width: 1px;
}
.filter-border:hover {
  border-color: #f8395a;
  border-width: 2px;
  transition: 0.2s ease;
}
.select {
  border-color: #f8395a;
  border-width: 2px;
}
</style>
