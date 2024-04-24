<template>
  <v-card class="mx-auto" max-width="400" hover>
    <v-row>
      <v-col>
        <v-carousel height="200" touch hide-delimiters class="slideBtn">
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
            cover
          >
            <v-icon
              class="tw-float-right tw-mx-2 tw-my-2"
              :color="liked ? '#F56040' : '#ffffff'"
              @click="toggleLike"
              >mdi-heart</v-icon
            >
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-card-title class="tw-font-extrabold tw-text-black">{{
      item.title
    }}</v-card-title>

    <v-card-subtitle class="pt-4 tw-font-semibold">
      {{ item.type }}
    </v-card-subtitle>

    <v-card-text>
      <div>{{ item.title }}</div>

      <div class="tw-font-bold">${{ item.price }}</div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
const liked = ref(false);

defineProps({
  item: {},
});

const items = [
  { src: "/assets/Listing1/1.jpg" },
  { src: "/assets/Listing1/2.jpg" },
  { src: "/assets/Listing1/3.jpeg" },
  { src: "/assets/Listing1/4.jpg" },
  { src: "/assets/Listing1/5.jpg" },
  { src: "/assets/Listing1/6.jpg" },
];

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
