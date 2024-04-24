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
              class="tw-mx-[242px] tw-my-2"
              :color="liked ? '#F56040' : '#ffffff'"
              @click="toggleLike"
              >mdi-heart</v-icon
            >
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-card-title class="tw-font-extrabold tw-text-black"
      >Top 10 Australian beaches</v-card-title
    >

    <v-card-subtitle class="pt-4"> Number 10 </v-card-subtitle>

    <v-card-text>
      <div>Whitehaven Beach</div>

      <div>Whitsunday Island, Whitsunday Islands</div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
const liked = ref(false);

const items = [
  { src: "/assets/imags/slide.jpg" },
  { src: "/assets/imags/pool_cat.jpg" },
  { src: "/assets/Listing1/1.jpg" },
  { src: "/assets/imags/island_cat.webp" },
  { src: "/assets/Listing1/7.jpg" },
  { src: "/assets/Listing2/7.jpg " },
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
  color: white;
  font-size: 25px;
  height: max-content;
}
:deep(.v-btn--icon.v-btn--density-default) {
  width: 0;
  font-size: 7px;
}
</style>
