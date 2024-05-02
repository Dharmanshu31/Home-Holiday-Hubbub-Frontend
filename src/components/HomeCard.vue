<template>
  <v-card class="mx-auto" max-width="300" max-height="400" hover>
    <v-row>
      <v-col>
        <v-carousel height="200" touch hide-delimiters class="slideBtn">
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
    <v-card-title class="tw-font-extrabold tw-text-black">{{
      item.name
    }}</v-card-title>

    <v-card-subtitle class="pt-4 tw-font-semibold">
      {{ item.location.city }}
    </v-card-subtitle>

    <v-card-text>
      <div>{{ item.propertyCategory }}</div>

      <div class="tw-font-bold">${{ item.pricePerNight }}</div>
    </v-card-text>
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
