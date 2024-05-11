<template>
  <div class="tw-mt-14 tw-mx-1 lg:tw-mx-11">
    <div class="tw-flex">
      <div class="tw-flex tw-flex-wrap tw-w-[80%]">
        <v-slide-group show-arrows class="tw-w-[1200px]">
          <v-slide-group-item>
            <div
              class="tw-m-7 tw-flex tw-flex-wrap tw-gap-5 tw-justify-center tw-items-center"
            >
              <div v-for="(icon, i) in data" :key="i">
                <div
                  :class="[
                    iconClass,
                    {
                      'tw-border-none': iconName !== icon.text,
                      'tw-border-first tw-border-2 tw-bg-gray-100':
                        iconName === icon.text,
                    },
                  ]"
                  @click="propertyCategoryFilter(icon.text)"
                >
                  <div class="tw-text-base md:tw-text-lg">
                    <v-icon :icon="icon.name"></v-icon>
                  </div>
                  <p class="tw-text-center tw-text-sm md:tw-text-base">
                    {{ icon.text }}
                  </p>
                </div>
              </div>
            </div>
          </v-slide-group-item>
        </v-slide-group>
      </div>
      <div class="tw-w-[20%]">
        <v-btn
          prepend-icon="mdi-tune"
          class="tw-mt-8"
          variant="outlined"
          style="height: 56px"
          @click="filterToggle = !filterToggle"
          ><span class="tw-text-sm">filters</span></v-btn
        >
      </div>
    </div>
    <v-dialog width="auto" v-model="filterToggle">
      <div class="tw-w-[900px] tw-h-[615px] tw-bg-white" rounded="xl">
        <div>
          <div class="tw-flex tw-items-center tw-justify-center">
            <v-icon
              icon="mdi-close"
              @click="filterToggle = !filterToggle"
            ></v-icon>
            <div class="tw-w-[90%]">
              <h1 class="tw-text-center tw-text-xl tw-my-6 tw-font-bold">
                <v-icon icon="mdi-tune"></v-icon> Filters
              </h1>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div class="tw-p-7">
            <p class="tw-text-2xl tw-font-bold">Type of place</p>
            <p class="tw-text-lg">
              Search rooms, entire homes or any type of place
            </p>
          </div>
        </div>
        <div class="tw-flex tw-justify-center">
          <div
            :class="{
              'tw-border tw-border-gray-300 tw-h-20 tw-w-60 tw-text-center tw-flex tw-justify-center tw-items-center tw-text-lg tw-font-bold tw-cursor-pointer hover:tw-border-black': true,
              'tw-rounded-l-3xl': i === 0,
              'tw-rounded-r-3xl': i === plases.length - 1,
              'tw-bg-black tw-text-white': place.name === typePlace,
            }"
            v-for="(place, i) in plases"
            :key="i"
            @click="typeProperty(place.name)"
          >
            {{ place.name }}
          </div>
        </div>
        <hr class="tw-mt-8" />
        <p class="tw-text-2xl tw-font-bold tw-p-7">Rooms and beds</p>
        <div>
          <p class="tw-text-lg tw-font-semibold tw-px-7 tw-py-4">Bedrooms</p>
          <div class="tw-flex tw-justify-center">
            <div
              :class="{
                'tw-border tw-border-gray-300 tw-h-20 tw-w-60 tw-text-center tw-flex tw-justify-center tw-items-center tw-text-lg tw-font-bold tw-cursor-pointer hover:tw-border-black': true,
                // 'tw-bg-black tw-text-white': place.name === typePlace,
              }"
              v-for="(place, i) in 8"
              :key="i"
            >
              {{ place }}
            </div>
          </div>
        </div>

        <p class="tw-text-lg tw-font-semibold tw-px-7 tw-py-4">Bed</p>
        <p class="tw-text-lg tw-font-semibold tw-px-7 tw-py-4">Bathrooms</p>
      </div>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { icons, amenities, plases } from "../data";
const data = icons.concat(amenities);
data.unshift({ name: "mdi-earth", text: "All" });
const iconName = ref("");
const filterToggle = ref(false);
const typePlace = ref("");
const iconClass =
  "filter-border tw-border tw-w-[90px] tw-h-14 md:tw-w-[139px] md:tw-h-[71px] tw-rounded-xl tw-cursor-pointer tw-flex tw-justify-center tw-items-center tw-flex-col tw-text-[19px]";
const propertyCategoryFilter = (iconText) => {
  if (iconName.value === iconText) {
    iconName.value = "";
  } else {
    iconName.value = iconText;
  }
  console.log(iconName.value);
};
const typeProperty = (propertyTypeName) => {
  if (typePlace.value === propertyTypeName) {
    typePlace.value = "";
  } else {
    typePlace.value = propertyTypeName;
  }
  console.log(typePlace.value);
};
</script>

<style scoped>
hr {
  border: inherit;
  border-width: 1px;
}
</style>
