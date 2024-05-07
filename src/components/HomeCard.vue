<template>
  <v-card width="350" hover>
    <v-row>
      <v-col>
        <v-carousel height="300" touch hide-delimiters class="slideBtn">
          <v-carousel-item
            v-for="(item, i) in item.images"
            :key="i"
            :src="`/assets/properts/${item}`"
            cover
          >
            <v-icon
              class="tw-float-right tw-mx-2 tw-my-2"
              :color="liked ? '#F56040' : '#ffffff'"
              @click="toggleLike"
              :icon="liked ? 'mdi-heart' : 'mdi-heart-outline'"
            ></v-icon>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <router-link :to="`/property/${item._id}`">
      <v-card-title class="tw-font-extrabold tw-text-black">{{
        item.name
      }}</v-card-title>

      <v-card-text>
        <div class="tw-text-base">{{ item.propertyCategory }}</div>
        <div class="tw-text-base">
          {{ item.location.city }} , {{ item.location.state }}
        </div>
        <div class="tw-font-bold tw-text-base tw-mt-2">
          &#x20B9; {{ item.pricePerNight }} night
        </div>
        <div class="tw-flex tw-mt-3 tw-text-base tw-text-center">
          <v-icon icon="mdi-star" color="#f9a825"> </v-icon>
          <div v-if="item.ratingsAverage > 0" class="tw-font-semibold tw-pl-1">
            {{ item.ratingsAverage }}/5
          </div>
          <div v-else class="tw-font-semibold tw-pl-1">No reviews yet</div>
        </div>
      </v-card-text>
    </router-link>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
const liked = ref(false);
defineProps({
  item: {},
});

function toggleLike() {
  liked.value = !liked.value;
}
</script>
<style scoped>
:deep(.slideBtn .v-btn--icon.v-btn--size-default) {
  background-color: white;
  box-shadow: none;
}
:deep(.slideBtn .v-btn--icon.v-btn--size-default) {
  color: rgb(255, 255, 255);
  font-size: 25px;
  height: max-content;
}
:deep(.v-btn--icon.v-btn--density-default) {
  width: 0;
  font-size: 7px;
}
</style>
