<template>
  <v-container class="tw-mt-8">
    <v-row>
      <v-col class="tw-text-heading tw-font-bold tw-text-3xl tw-my-10">
        Your Wish List
      </v-col>
    </v-row>
    <div class="tw-mt-8 tw-grid md:tw-grid-cols-2 xl:tw-grid-cols-3  tw-gap-8 tw-justify-center">
      <div v-for="(item, i) in items" :key="i">
        <HomeCard :item="item" />
      </div>
    </div>
  </v-container>
</template>

<script setup>
import HomeCard from "../components/HomeCard.vue";
  import { useStore } from "vuex";
  import { ref, onMounted } from "vue";

  const store = useStore();
  const items = ref([]);

  onMounted(async () => {
    const res = await store.dispatch("getUserWishList");
    items.value = res.wishList;
  });
</script>

<style></style>
