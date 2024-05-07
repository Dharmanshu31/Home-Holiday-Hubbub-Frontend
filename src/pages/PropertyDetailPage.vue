<template>
  <v-container>
    <div class="tw-flex tw-justify-between tw-items-center">
      <h1 class="tw-text-2xl sm:tw-text-4xl tw-font-bold">
        {{ response.name }}
      </h1>
      <div class="tw-flex tw-items-center">
        <v-btn
          class="tw-float-right tw-mx-2 tw-my-2"
          :color="like ? '#F56040' : '#000'"
          @click="like = !like"
          :icon="like ? 'mdi-heart' : 'mdi-heart-outline'"
          variant="elevated"
        ></v-btn>
      </div>
    </div>
    <div class="tw-flex tw-flex-wrap tw-gap-3 tw-my-5">
      <v-img
        v-for="(image, i) in response.images"
        :src="`../../assets/properts/${image}`"
        :key="i"
        class="tw-min-w-72"
      ></v-img>
    </div>
    <h2
      v-if="response.location"
      class="tw-text-xl tw-font-bold tw-mt-12 sm:tw-text-3xl"
    >
      {{ response.propertyType }} in {{ response.location.city }},
      {{ response.location.state }}, {{ response.location.country }}
    </h2>
    <p class="tw-mt-3 tw-font-bold tw-text-base sm:tw-text-lg">
      {{ response.maxGuests }} guests - {{ response.bedrooms }} bedroom(s) -
      {{ response.bed }} bed(s) - {{ response.bathrooms }} bathroom(s)
    </p>
    <div class="tw-flex tw-text-base tw-text-center tw-mt-3">
      <v-icon icon="mdi-star" color="#f9a825"> </v-icon>
      <div v-if="response.ratingsAverage > 0" class="tw-font-semibold tw-pl-1">
        {{ response.ratingsAverage }}/5
      </div>
      <div v-else class="tw-font-semibold tw-pl-1">No reviews yet</div>
    </div>
    <hr />
    <div class="tw-flex tw-items-center tw-gap-5">
      <v-avatar size="60">
        <v-img
          :alt="user.name"
          :src="`../../assets/users/${user.photo}`"
        ></v-img>
      </v-avatar>
      <h3 class="tw-font-bold tw-text-base sm:tw-text-lg">
        Hosted by {{ user.name }}
      </h3>
    </div>
    <hr />
    <h3 class="tw-text-xl tw-font-bold">Description</h3>
    <p class="tw-max-w-[900px] tw-mt-5 tw-font-medium">
      {{ response.description }}
    </p>
    <hr />
    <h3 class="tw-text-xl tw-font-bold">{{ response.highlight }}</h3>
    <p class="tw-max-w-[900px] tw-mt-5 tw-font-medium">
      {{ response.highlightDetail }}
    </p>
    <hr />
    <div class="tw-flex tw-justify-between tw-flex-wrap tw-mt-10">
      <div>
        <h2 class="tw-text-xl tw-font-bold sm:tw-text-2xl">
          What this place offers?
        </h2>
        <div
          class="tw-grid tw-grid-cols-2 tw-my-8 tw-max-w-[700px] tw-gap-x-5 sm:tw-gap-x-28"
        >
          <div
            class="tw-flex tw-items-center tw-gap-5 text-xl tw-mb-8"
            v-for="(amenity, i) in response.amenities"
            :key="i"
          >
            <div class="tw-text-xl sm:tw-text-2xl">
              <v-icon :icon="getAmenityIcon(amenity)"></v-icon>
            </div>
            <p class="tw-font-semibold tw-text-lg">{{ amenity }}</p>
          </div>
        </div>
      </div>
      <div>
        <h2 class="tw-text-xl tw-font-bold sm:tw-text-2xl">
          How long do you want to stay?
        </h2>
        <div class="tw-mt-9 tw-flex tw-flex-col tw-items-center">
          <Calander v-model="selectedDate" />
          <div class="tw-mt-9 tw-text-center">
            <v-btn
              @click="toggaleDialog()"
              class="tw-w-44 tw-mx-2"
              color="#F8395A"
              >Booking</v-btn
            >
            <v-btn @click="clearDate()" class="tw-w-44" color="#222222"
              >Clear</v-btn
            >
          </div>
        </div>
        <v-dialog v-model="dialog" width="auto">
          <v-card width="1000" height="300" class="tw-text-center">
            <v-card-title class="tw-font-bold"> Confirm And Pay </v-card-title>
            <v-card-text>
              <h3 class="tw-text-xl tw-mb-2 tw-font-bold">
                &#x20B9; {{ response.pricePerNight }} X {{ totalNights }} night
              </h3>
              <h3 class="tw-text-xl tw-mb-2 tw-font-bold">
                Total price: &#x20B9;
                {{ totalPrice }}
              </h3>
              <p class="tw-text-base tw-mb-2 tw-font-bold">
                Start Date: {{ startDate }}
              </p>
              <p class="tw-text-base tw-mb-2 tw-font-bold">
                End Date: {{ endDate }}
              </p>
            </v-card-text>
            <v-btn @click="toggaleDialog()" color="#F8395A"
              >Confirm Booking</v-btn
            >
          </v-card>
        </v-dialog>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { amenities } from "../data";
import Calander from "../components/Calander.vue";
const router = useRouter();
const response = ref({});
const user = ref({});
const selectedDate = ref([new Date()]);
const dialog = ref(false);
const store = useStore();
const route = useRoute();
const like = ref(false);
onMounted(async () => {
  const res = await store.dispatch("getOneProperty", route.params.propertyId);
  response.value = res.data;
  if (res.response && res.response.status === 400) {
    router.replace("/notFound");
  }
});
onMounted(() => {
  store.dispatch("getUser");
  user.value = store.state.user.user;
});
const startDate = computed(() =>
  new Date(selectedDate.value[0]).toDateString()
);
const endDate = computed(() =>
  new Date(selectedDate.value[selectedDate.value.length - 1]).toDateString()
);

const totalNights = computed(() => selectedDate.value.length);
const totalPrice = computed(
  () => response.value.pricePerNight * totalNights.value
);

const getAmenityIcon = (amenityText) => {
  const foundAmenity = amenities.find(
    (amenitie) => amenitie.text === amenityText
  );
  return foundAmenity ? foundAmenity.name : "";
};
const toggaleDialog = () => {
  dialog.value = !dialog.value;
};
const clearDate = () => {
  selectedDate.value = [new Date()];
};
</script>

<style scoped>
hr {
  margin: 20px 0;
  border-style: inset;
  border-width: 1px;
}
</style>
