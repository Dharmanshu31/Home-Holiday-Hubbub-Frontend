<template>
  <div class="tw-mt-14 tw-mx-11">
    <v-slide-group show-arrows class="tw-w-[1200px]">
      <v-slide-group-item>
        <div
          class="tw-m-7 tw-flex tw-flex-wrap tw-gap-5 tw-justify-center tw-items-center"
        >
          <div v-for="(icon, i) in icons" :key="i">
            <div
              :class="[
                iconClass,
                {
                  'tw-border-gray-500': iconName.includes(icon.text),
                  'tw-border-pinkRed tw-border-2 tw-bg-gray-100':
                    iconName.includes(icon.text),
                },
              ]"
              @click="propertyCategoryFilter(icon.text)"
            >
              <v-icon :icon="icon.name" class="tw-text-3xl"></v-icon>
              <p class="tw-text-center">
                {{ icon.text }}
              </p>
            </div>
          </div>
        </div>
      </v-slide-group-item>
    </v-slide-group>
  </div>
  <router-view></router-view>
</template>

<script setup>
import { ref } from "vue";
import { icons } from "../data";
const iconName = ref([]);
const iconClass =
  "filter-border tw-border tw-w-28 tw-h-24 tw-rounded-xl tw-cursor-pointer tw-flex tw-justify-center tw-items-center tw-flex-col tw-text-[19px]";
const propertyCategoryFilter = (iconText) => {
  const index = iconName.value.indexOf(iconText);
  if (index !== -1) {
    iconName.value.splice(index, 1);
  } else {
    iconName.value.push(iconText);
  }
  console.log(iconName.value);
};
</script>

<style></style>
