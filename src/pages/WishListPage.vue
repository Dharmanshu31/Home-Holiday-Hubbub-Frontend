<template>
  <v-container class="tw-mt-8">
    <v-row>
      <v-col class="tw-text-heading tw-font-bold tw-text-3xl tw-my-10">
        Your Wish List
      </v-col>
    </v-row>
    <div
      class="tw-mt-8 tw-grid md:tw-grid-cols-2 xl:tw-grid-cols-3 tw-gap-8 tw-justify-center"
      v-if="items.length > 0"
    >
      <div v-for="(item, i) in items" :key="i">
        <HomeCard :item="item" />
      </div>
    </div>
    <div v-else class="tw-text-center tw-my-28">
      <p class="tw-text-xl tw-font-bold">
        No Data Found Add Property To Your WishList !!!!!
      </p>
    </div>
    <Loader v-if="loading" />
  </v-container>
  <v-pagination
    v-model="page"
    :length="totalPage"
    :total-visible="7"
    active-color="#024950"
  ></v-pagination>
</template>

<script setup>
import HomeCard from "../components/HomeCard.vue";
import { useStore } from "vuex";
import { ref, onMounted, watch } from "vue";

const store = useStore();
const items = ref([]);
const loading = ref(false);
const page = ref(1);
const totalPage = ref(1);

const fatchWishlist = async () => {
  loading.value = true;
  const res = await store.dispatch("getUserWishList", page.value);
  items.value = res[0].wishList;
  totalPage.value = Math.ceil(res[1] / 6);
  loading.value = false;
};
//fatch wislist data
onMounted(async () => {
  fatchWishlist();
});

watch(page, () => {
  fatchWishlist();
});
</script>
