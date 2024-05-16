<template>
  <div class="tw-mt-14 tw-mx-1 lg:tw-mx-11">
    <div class="tw-flex tw-w-full">
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
          v-if="$vuetify.display.smAndUp"
          prepend-icon="mdi-tune"
          class="tw-mt-8"
          variant="outlined"
          style="height: 56px"
          @click="filterToggle = !filterToggle"
          ><span class="tw-text-sm">filters</span></v-btn
        >
        <v-btn
          v-else
          icon="mdi-tune"
          class="tw-mt-7"
          variant="text"
          @click="filterToggle = !filterToggle"
        ></v-btn>
      </div>
    </div>
    <v-dialog width="auto" v-model="filterToggle">
      <div
        class="md:tw-max-w-[900px] md:tw-h-[615px] tw-bg-white tw-rounded-3xl tw-max-w-[400px]"
      >
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
        <div class="tw-overflow-y-scroll tw-max-h-[534px] tw-rounded-3xl">
          <div>
            <div class="tw-p-7">
              <p class="md:tw-text-2xl tw-font-bold tw-text-xl">
                Type of place
              </p>
              <p class="md:tw-text-lg tw-text-base">
                Search rooms, entire homes or any type of place
              </p>
            </div>
          </div>
          <div class="tw-flex tw-justify-center">
            <div
              :class="{
                'tw-border tw-border-gray-300 md:tw-h-20 md:tw-w-60 tw-h-16 tw-w-56 tw-text-center tw-flex tw-justify-center tw-items-center md:tw-text-lg tw-text-sm tw-font-bold tw-cursor-pointer hover:tw-border-black': true,
                'tw-rounded-l-3xl': i === 0,
                'tw-rounded-r-3xl': i === plases.length - 1,
                'tw-bg-gradient-to-r tw-from-black tw-via-stone-600 tw-to-black tw-text-white':
                  place.name === typePlace,
              }"
              v-for="(place, i) in plases"
              :key="i"
              @click="typeProperty(place.name)"
            >
              {{ place.name }}
            </div>
          </div>
          <hr class="tw-mt-8" />
          <p class="md:tw-text-2xl tw-text-xl tw-font-bold tw-p-7">
            Rooms and beds
          </p>
          <div>
            <p
              class="md:tw-text-lg tw-text-base tw-font-semibold tw-px-7 tw-py-4"
            >
              Bedrooms
            </p>
            <div class="tw-flex tw-justify-center md:tw-gap-4 tw-gap-2">
              <div
                :class="{
                  'tw-border tw-border-gray-300 tw-h-10 tw-w-20 tw-text-center tw-flex tw-justify-center tw-items-center md:tw-text-lg tw-text-sm tw-font-bold tw-cursor-pointer hover:tw-border-black tw-rounded-full': true,
                  'tw-bg-gradient-to-r tw-from-black tw-via-stone-600 tw-to-black tw-text-white':
                    i + 1 === bedrooms,
                }"
                v-for="(place, i) in 8"
                :key="i"
                @click="setBedroom(i + 1)"
              >
                {{ i !== 7 ? place : `${place}+` }}
              </div>
            </div>
          </div>
          <p
            class="md:tw-text-lg tw-text-base tw-font-semibold tw-px-7 tw-py-4"
          >
            Bed
          </p>
          <div class="tw-flex tw-justify-center md:tw-gap-4 tw-gap-2">
            <div
              :class="{
                'tw-border tw-border-gray-300 tw-h-10 tw-w-20 tw-text-center tw-flex tw-justify-center tw-items-center md:tw-text-lg tw-text-sm tw-font-bold tw-cursor-pointer hover:tw-border-black tw-rounded-full': true,
                'tw-bg-gradient-to-r tw-from-black tw-via-stone-600 tw-to-black tw-text-white':
                  i + 1 === beds,
              }"
              v-for="(place, i) in 8"
              :key="i"
              @click="setBed(i + 1)"
            >
              {{ i !== 7 ? place : `${place}+` }}
            </div>
          </div>
          <p
            class="md:tw-text-lg tw-text-base tw-font-semibold tw-px-7 tw-py-4"
          >
            Bathrooms
          </p>
          <div class="tw-flex tw-justify-center md:tw-gap-4 tw-gap-2">
            <div
              :class="{
                'tw-border tw-border-gray-300 tw-h-10 tw-w-20 tw-text-center tw-flex tw-justify-center tw-items-center md:tw-text-lg tw-text-sm tw-font-bold tw-cursor-pointer hover:tw-border-black tw-rounded-full': true,
                'tw-bg-gradient-to-r tw-from-black tw-via-stone-600 tw-to-black tw-text-white':
                  i + 1 === bathrooms,
              }"
              v-for="(place, i) in 8"
              :key="i"
              @click="setBathroom(i + 1)"
            >
              {{ i !== 7 ? place : `${place}+` }}
            </div>
          </div>
          <hr class="tw-mt-8" />
          <p class="md:tw-text-2xl tw-text-xl tw-font-bold tw-px-7 tw-pt-4">
            Rating's
          </p>
          <p class="md:tw-text-base tw-text-sm tw-px-7">
            Seclect the rating which will nearest to your search rating
          </p>
          <div class="tw-flex tw-flex-col">
            <v-rating
              class="tw-px-7 md:tw-text-2xl tw-text-xl"
              v-model="rating"
              active-color="yellow-accent-4"
              half-increments
              size="60"
              hover
            ></v-rating>
          </div>
          <hr />
          <p class="md:tw-text-2xl tw-text-xl tw-font-bold tw-px-7 tw-pt-4">
            Sorted by
          </p>
          <div class="tw-grid tw-grid-cols-2 tw-m-3 tw-gap-4">
            <v-btn
              append-icon="mdi-sort"
              variant="outlined"
              @click="sortDateNew = !sortDateNew"
              :class="{ btnGrad: sortDateNew }"
              ><span class="tw-text-sm">Newest</span></v-btn
            >
            <v-btn
              append-icon="mdi-sort"
              variant="outlined"
              @click="sortDateOld = !sortDateOld"
              :class="{ btnGrad: sortDateOld }"
              ><span class="tw-text-sm">Oldest</span></v-btn
            >
            <v-btn
              append-icon="mdi-arrow-up"
              variant="outlined"
              @click="priceUp = !priceUp"
              :class="{ btnGrad: priceUp }"
              ><span class="tw-text-sm">price</span></v-btn
            >
            <v-btn
              append-icon="mdi-arrow-down"
              variant="outlined"
              @click="priceDown = !priceDown"
              :class="{ btnGrad: priceDown }"
            >
              <span class="tw-text-sm">price</span>
            </v-btn>
          </div>
        </div>
      </div>
    </v-dialog>
    <div class="tw-min-h-[600px]">
      <div class="tw-mt-8 tw-flex tw-flex-wrap tw-gap-8 tw-justify-center">
        <HomeCard v-for="(item, i) in property" :item="item" :key="i" />
      </div>
    </div>
    <v-pagination
      v-model="page"
      :length="Math.ceil(property.length / 10) + 10"
      :total-visible="7"
      active-color="#024950"
    ></v-pagination>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, watchEffect } from "vue";
import { icons, amenities, plases } from "../data";
import HomeCard from "../components/HomeCard.vue";
import { useStore } from "vuex";

const data = icons.concat(amenities);
data.unshift({ name: "mdi-earth", text: "All" });
const iconName = ref("");
const filterToggle = ref(false);
const typePlace = ref("");
const bedrooms = ref(1);
const beds = ref(1);
const bathrooms = ref(1);
const rating = ref(1);
const priceUp = ref(false);
const priceDown = ref(false);
const sortDateNew = ref(false);
const sortDateOld = ref(false);
const page = ref(1);
const property = ref([]);
const store = useStore();

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
const setBedroom = (num) => {
  if (bedrooms.value === num) {
    bedrooms.value = 0;
  } else {
    bedrooms.value = num;
  }
  console.log(bedrooms.value);
};
const setBed = (num) => {
  if (beds.value === num) {
    beds.value = 0;
  } else {
    beds.value = num;
  }
  console.log(beds.value);
};
const setBathroom = (num) => {
  if (bathrooms.value === num) {
    bathrooms.value = 0;
  } else {
    bathrooms.value = num;
  }
  console.log(bathrooms.value);
};

//fething filter Date
const params = reactive({ page: page.value, limit: 2 });
const fetchProperty = async (params) => {
  const response = await store.dispatch("getFilterProperty", params);
  console.log(response);
  property.value = response.data.properties;
};

watchEffect(() => {
  params.page = page.value;
  fetchProperty(params);
});

</script>

<style scoped>
hr {
  border: inherit;
  border-width: 1px;
}

.btnGrad {
  background: linear-gradient(to right, black, #787878, black);
  color: white;
}
</style>
